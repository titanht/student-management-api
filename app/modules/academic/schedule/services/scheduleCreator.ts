import fs from 'fs';
import _ from 'lodash';
import AcademicYearService from '../../academicYear/academicYearService';
import DataFetcher from './dataFetchService';
import { ScheduleUtils, WEEK_DAYS } from './scheduleUtils';
import ScheduleValidator from './scheduleValidator';

const ITERATION_TOTAL = 5;
const REFINE_TOTAL = 10;
const COUNTER_MAX = 35;

// const ITERATION_TOTAL = 1;
// const REFINE_TOTAL = 1;
// const COUNTER_MAX = 3;

export class ScheduleCreator {
  static async createSchedule() {
    let weekDays = [...WEEK_DAYS];
    const yearId = (await AcademicYearService.getActive()).id;
    const fetcher = new DataFetcher();
    const validator = new ScheduleValidator();

    const classSubjectWeeklyMap = await fetcher.getClassSubjectWeeklyMap(
      yearId
    );
    const teacherTotalSubjectCountMap =
      await fetcher.getTeacherTotalSubjectCountMap(yearId);
    let classSubjectTeacherWeeklyMap =
      await fetcher.getClassSubjectTeacherWeeklyMap(yearId);
    let classes = Object.keys(classSubjectWeeklyMap);

    await validator.validateGradeMaxPeriodCount(classSubjectWeeklyMap);
    await validator.validateTeacherMaxPeriodCount(teacherTotalSubjectCountMap);

    // // const initialGradeWeekData = { ...gradeWeekData };
    let refined;
    for (let k = 0; k < REFINE_TOTAL; k++) {
      console.log(`\nRefine: ${k} / ${ITERATION_TOTAL}`);
      const schedules: any[] = [];
      for (let i = 0; i < ITERATION_TOTAL; i++) {
        // console.log('iteration', i);
        const gradeWeekData = await fetcher.initializeGradeWeek();
        classSubjectTeacherWeeklyMap =
          await fetcher.getClassSubjectTeacherWeeklyMap(yearId);
        let counter = 0;
        while (
          !ScheduleUtils.areAllGradesAssigned(classSubjectTeacherWeeklyMap) &&
          counter < COUNTER_MAX
        ) {
          //     // console.log(`Counter: ${counter}`);
          classes = _.shuffle(classes);
          for (let j = 0; j < classes.length; j++) {
            //       // console.log(`j: ${j}`);
            const classItem = classes[j];
            const curSubTeach = classSubjectTeacherWeeklyMap[classItem];
            if (!ScheduleUtils.isGradeAssigned(curSubTeach)) {
              const subject =
                ScheduleUtils.getSubjectWithLargestCount(curSubTeach);
              const { teacher } = curSubTeach[subject];
              let periods = [0, 1, 2, 3, 4, 5, 6, 7];
              let subjectAssigned = false;
              weekDays = _.shuffle(weekDays);
              for (let l = 0; l < weekDays.length; l++) {
                //           //             // console.log(`l ${l}`);
                const day = weekDays[l];
                if (subjectAssigned) {
                  break;
                }
                if (
                  ScheduleUtils.subjectAssignedOnDay(
                    gradeWeekData[classItem],
                    subject,
                    day
                  )
                ) {
                  // console.log('assigned on day', subject, day);
                  // continue;
                }
                periods = _.shuffle(periods);
                for (let m = 0; m < periods.length; m++) {
                  //               // console.log(`m: ${m}`);
                  const period = periods[m];
                  if (subjectAssigned) {
                    break;
                  }
                  if (
                    !ScheduleUtils.gradeAssignedDayPeriod(
                      gradeWeekData[classItem],
                      day,
                      period
                    ) &&
                    !ScheduleUtils.teacherAssignedDayPeriod(
                      gradeWeekData,
                      teacher,
                      day,
                      period
                    )
                  ) {
                    gradeWeekData[classItem][day][period] = {
                      teacher: {
                        id: teacher,
                      },
                      subject: {
                        id: subject,
                      },
                    };
                    classSubjectTeacherWeeklyMap[classItem][subject].count -= 1;
                    subjectAssigned = true;
                  }
                }
              }
            }
          }
          counter++;
          /** Logger */
          // fs.writeFileSync(
          //   path.join(__dirname, 'out.test.json'),
          //   JSON.stringify(classes, null, 2)
          // );
        }

        const unassignedCount = ScheduleUtils.getUnassignedTotal(
          classSubjectTeacherWeeklyMap
        );
        const unassignedByClass = ScheduleUtils.getUnassignedByClass(
          classSubjectTeacherWeeklyMap
        );
        schedules.push({
          schedule: gradeWeekData,
          unassignedCount,
          unassignedByClass,
          classWeeklyMap: classSubjectTeacherWeeklyMap,
        });
        //   /** // End Logger */
      }

      schedules.sort((a, b) => a.unassignedCount - b.unassignedCount);
      // console.log('schedules', schedules.length);
      // require('fs').writeFileSync(
      //   require('path').join(__dirname, 'schedules.test.json'),
      //   JSON.stringify({
      //     schedules,
      //   })
      // );
      const chosen = schedules[0];
      refined = this.refine(chosen);
      // console.log(
      //   `Chosen ${chosen.unassignedCount}, refined: ${refined.unassignedCount}`
      // );
      if (refined.unassignedCount === 0) {
        break;
      }
    }

    fs.writeFileSync(
      `${__dirname}/out.json`,
      JSON.stringify(teacherTotalSubjectCountMap, null, 2)
    );

    console.log(`Refined final: ${refined.unassignedCount}`);
    return refined;
  }

  static refine(classSchedule) {
    const gradeWeekMap = classSchedule.schedule;
    const { classWeeklyMap } = classSchedule;
    const classes = Object.keys(classWeeklyMap);

    for (let i = 0; i < classSchedule.unassignedCount; i++) {
      classes.forEach((classItem) => {
        const subjects = Object.keys(classWeeklyMap[classItem]);
        subjects.forEach((subject) => {
          if (classWeeklyMap[classItem][subject].count > 0) {
            const replacement = ScheduleUtils.findReplacement(
              gradeWeekMap,
              classItem,
              classWeeklyMap[classItem][subject].teacher,
              subject
            );
            // console.log('rep', replacement);
            if (replacement !== null) {
              if (replacement.nullSpot) {
                gradeWeekMap[classItem][replacement.swapDay][
                  replacement.swapPeriod
                ] = {
                  subject: { id: subject },
                  teacher: { id: classWeeklyMap[classItem][subject].teacher },
                };
              } else {
                gradeWeekMap[classItem][replacement.emptyDay][
                  replacement.emptyPeriod
                ] =
                  gradeWeekMap[classItem][replacement.swapDay][
                    replacement.swapPeriod
                  ];
                gradeWeekMap[classItem][replacement.swapDay][
                  replacement.swapPeriod
                ] = {
                  subject: { id: subject },
                  teacher: { id: classWeeklyMap[classItem][subject].teacher },
                };
              }
              classWeeklyMap[classItem][subject].count -= 1;
            }
          }
        });
      });
    }

    const unassignedCount = ScheduleUtils.getUnassignedTotal(classWeeklyMap);
    const unassignedByClass =
      ScheduleUtils.getUnassignedByClass(classWeeklyMap);

    return {
      unassignedCount,
      unassignedByClass,
      schedule: gradeWeekMap,
      classWeeklyMap,
    };
  }
}
