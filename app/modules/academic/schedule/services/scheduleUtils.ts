export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const PERIOD_COUNT = 7;

export const DAY_COUNT = 5;

export const MAX_PERIODS = PERIOD_COUNT * DAY_COUNT;

export class ScheduleUtils {
  /**
   *
   * @param {Object} gradeWeekMapOfGrade =
      {
        [day]: {
          [period]: {
            teacher: {id, name},
            subject: {id, subject},
          }
        }
      }
   * @param {*} subjectId
   * @param {*} day
   */
  static subjectAssignedOnDay(
    gradeWeekMapOfGrade: object,
    subjectId: string,
    day: string
  ) {
    const periods = Object.keys(gradeWeekMapOfGrade[day]);
    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      if (
        gradeWeekMapOfGrade[day][period] !== null &&
        gradeWeekMapOfGrade[day][period].subject.id === subjectId
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   *
   * @param {Object} gradeWeekMap =
      {
        [grade.id]: {
          [day]: {
            [period]: {
              teacher: {id, name},
              subject: {id, subject},
            }
          }
        }
      }
   * @param {integer} teacherUserId
   * @param {*} day
   * @param {*} period
   */
  static teacherAssignedDayPeriod(gradeWeekMap, teacherUserId, day, period) {
    const classIds = Object.keys(gradeWeekMap);
    for (let i = 0; i < classIds.length; i++) {
      const classId = classIds[i];
      const map = gradeWeekMap[classId];
      if (
        map[day] &&
        map[day][period] &&
        map[day][period].teacher &&
        map[day][period].teacher.id === teacherUserId
      ) {
        return true;
      }
    }

    return false;
  }

  static gradeAssignedDayPeriod(gradeWeekMapGrade, day, period) {
    return gradeWeekMapGrade[day][period] !== null;
  }

  static getSubjectWithLargestCount(classSubjectTeacherWeeklyMapGrade) {
    let bigCount = -1;
    let subject: string | null = null;
    const keys = Object.keys(classSubjectTeacherWeeklyMapGrade);
    keys.forEach((key) => {
      if (classSubjectTeacherWeeklyMapGrade[key].count > bigCount) {
        bigCount = classSubjectTeacherWeeklyMapGrade[key].count;
        subject = key;
      }
    });

    return subject;
  }

  static isGradeAssigned(classSubjectTeacherWeeklyMapOfGrade) {
    const subjectCounts = Object.values(
      classSubjectTeacherWeeklyMapOfGrade
    ) as any;
    for (let i = 0; i < subjectCounts.length; i++) {
      if (subjectCounts[i].count > 0) {
        return false;
      }
    }

    return true;
  }

  static areAllGradesAssigned(classSubjectTeacherWeeklyMap) {
    const grades = Object.keys(classSubjectTeacherWeeklyMap);
    for (let i = 0; i < grades.length; i++) {
      if (!this.isGradeAssigned(classSubjectTeacherWeeklyMap[grades[i]])) {
        return false;
      }
    }

    return true;
  }

  static getUnassignedTotal(classSubjectTeacherWeeklyMap) {
    let totalUnassigned = 0;
    const classKeys = Object.keys(classSubjectTeacherWeeklyMap);
    classKeys.forEach((classKey) => {
      const classMap = classSubjectTeacherWeeklyMap[classKey];
      const subjectKeys = Object.keys(classMap);
      subjectKeys.forEach((subjectKey) => {
        totalUnassigned += classMap[subjectKey].count || 0;
      });
    });

    return totalUnassigned;
  }

  static getUnassignedByClass(classSubjectTeacherWeeklyMap) {
    const unassigned = {};
    const classKeys = Object.keys(classSubjectTeacherWeeklyMap);
    classKeys.forEach((classKey) => {
      let classTotal = 0;
      const classMap = classSubjectTeacherWeeklyMap[classKey];
      const subjectKeys = Object.keys(classMap);
      subjectKeys.forEach((subjectKey) => {
        classTotal += classMap[subjectKey].count || 0;
      });
      unassigned[classKey] = classTotal;
    });

    return unassigned;
  }

  static findEmptySlots(gradeWeekMap, grade) {
    const periods = [0, 1, 2, 3, 4, 5, 6];
    const emptySlots: object[] = [];
    WEEK_DAYS.forEach((day) => {
      periods.forEach((period) => {
        if (gradeWeekMap[grade][day][period] === null) {
          emptySlots.push({
            class: grade,
            day,
            period,
          });
        }
      });
    });

    return emptySlots;
  }

  static findReplacement(gradeWeekMap, grade, teacherId, subjectId) {
    const emptySlots = this.findEmptySlots(gradeWeekMap, grade);
    const periods = [0, 1, 2, 3, 4, 5, 6];

    if (emptySlots.length) {
      const curGradeSchedule = gradeWeekMap[grade];
      for (let i = 0; i < WEEK_DAYS.length; i++) {
        const day = WEEK_DAYS[i];
        if (!this.subjectAssignedOnDay(gradeWeekMap[grade], subjectId, day)) {
          for (let j = 0; j < periods.length; j++) {
            const period = periods[j];
            if (
              !this.teacherAssignedDayPeriod(
                gradeWeekMap,
                teacherId,
                day,
                period
              )
            ) {
              if (curGradeSchedule[day][period] === null) {
                return {
                  swapDay: day,
                  swapPeriod: period,
                  nullSpot: true,
                };
              }

              const curSched = curGradeSchedule[day][period];
              const curSubject = curSched.subject;
              const curTeacher = curSched.teacher;

              for (let k = 0; k < emptySlots.length; k++) {
                const empty = emptySlots[k] as any;
                const emptyDay = empty.day;
                const emptyPeriod = empty.period;

                if (
                  this.subjectAssignedOnDay(
                    gradeWeekMap[grade],
                    curSubject.id,
                    emptyDay
                  )
                ) {
                  break;
                }
                if (
                  this.teacherAssignedDayPeriod(
                    gradeWeekMap,
                    curTeacher.id,
                    emptyDay,
                    emptyPeriod
                  )
                ) {
                  break;
                }

                return {
                  emptyDay,
                  emptyPeriod,
                  swapDay: day,
                  swapPeriod: period,
                  nullSpot: false,

                  curT: curTeacher,
                  curSub: curSubject,
                };
              }
            }
          }
        }
      }
    }

    return null;
  }
}
