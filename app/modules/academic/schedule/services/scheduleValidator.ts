import User from 'app/modules/auth/user';
import _ from 'lodash';
import Grade from '../../grade/grade';
import { MAX_PERIODS } from './scheduleUtils';

export default class ScheduleValidator {
  async validateGradeMaxPeriodCount(gradeSubjectCountMap: object) {
    const gradeIds = Object.keys(gradeSubjectCountMap);
    for (let i = 0; i < gradeIds.length; i++) {
      const gradeId = gradeIds[i];
      const subMap = gradeSubjectCountMap[gradeId];

      const totalCount: number = _.isEmpty(subMap)
        ? 0
        : (Object.values(subMap).reduce(
            (a: number, b: number) => a + b
          ) as number);

      if (totalCount > MAX_PERIODS) {
        const grade = await Grade.findOrFail(gradeId);
        throw new Error(`Grade: ${grade.name} exceeds max period count`);
      }
    }

    return true;
  }

  async validateTeacherMaxPeriodCount(teacherSubjectCountMap: object) {
    const userIds = Object.keys(teacherSubjectCountMap);
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      if (teacherSubjectCountMap[userId] > MAX_PERIODS) {
        const user = await User.findOrFail(userId);
        throw new Error(
          `Teacher: ${user.first_name} ${user.father_name} exceeds (${teacherSubjectCountMap[userId]}) max weekly count ${MAX_PERIODS}`
        );
      }
    }

    return true;
  }
}
