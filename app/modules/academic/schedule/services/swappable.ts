import { ScheduleUtils } from './scheduleUtils';

export class Swappable {
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
  static isSwappable(gradeWeekMap, grade, source, target) {
    const sourceDay = source.day;
    const sourcePeriod = source.period;
    const sourceTeacherId =
      gradeWeekMap[grade][sourceDay][sourcePeriod].teacher.id;
    const sourceSubjectId =
      gradeWeekMap[grade][sourceDay][sourcePeriod].subject.id;

    const targetDay = target.day;
    const targetPeriod = target.period;
    const targetTeacherId =
      gradeWeekMap[grade][targetDay][targetPeriod].teacher.id;
    const targetSubjectId =
      gradeWeekMap[grade][targetDay][targetPeriod].subject.id;

    if (sourceSubjectId === targetSubjectId) {
      if (sourceTeacherId === targetTeacherId) {
        return true;
      }
    }

    if (
      ScheduleUtils.subjectAssignedOnDay(
        gradeWeekMap[grade],
        sourceSubjectId,
        targetDay
      ) ||
      ScheduleUtils.subjectAssignedOnDay(
        gradeWeekMap[grade],
        targetSubjectId,
        sourceDay
      )
    ) {
      return false;
    }

    if (
      ScheduleUtils.teacherAssignedDayPeriod(
        gradeWeekMap,
        sourceTeacherId,
        targetDay,
        targetPeriod
      ) ||
      ScheduleUtils.teacherAssignedDayPeriod(
        gradeWeekMap,
        targetTeacherId,
        sourceDay,
        sourcePeriod
      )
    ) {
      return false;
    }

    return true;
  }
}
