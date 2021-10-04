import Grade from '../../grade/grade';
import { massSerialize } from '../../../../services/utils/index';
import { PERIOD_COUNT, WEEK_DAYS } from './scheduleUtils';
import Cst from '../../marklist/cst/cst';
import Teacher from '../../teacher/teacher';

export default class DataFetcher {
  async getClassSubjectWeeklyMap(yearId: string) {
    const grades = massSerialize(await Grade.all()) as Grade[];
    const gradeMap = {};
    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];
      const csts = massSerialize(
        await Cst.query()
          .where('grade_id', grade.id)
          .preload('subject')
          .where('academic_year_id', yearId)
      ) as Cst[];
      gradeMap[grade.id] = {};

      csts.forEach((cst) => {
        // gradeMap[grade.id][cst.subject.subject] = cst.count;
        gradeMap[grade.id][cst.subject_id] = cst.count;
      });
    }

    return gradeMap;
  }

  async getClassSubjectTeacherWeeklyMap(yearId) {
    const teachers = massSerialize(await Teacher.query()) as Teacher[];
    const teachersMap = {};
    teachers.forEach((teacher) => {
      teachersMap[teacher.id] = teacher.user_id;
    });

    const grades = massSerialize(await Grade.all()) as Grade[];
    const gradeMap = {};

    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i];
      const csts = massSerialize(
        await Cst.query()
          .where('grade_id', grade.id)
          .where('academic_year_id', yearId)
          .preload('subject')
      ) as Cst[];
      gradeMap[grade.id] = {};

      csts.forEach((cst) => {
        if (!teachersMap[cst.teacher_id]) {
          console.log('unknown teacher id', cst.teacher_id);
        }
        gradeMap[grade.id][cst.subject_id] = {
          teacher: teachersMap[cst.teacher_id],
          count: cst.count,
        };
      });
    }

    return gradeMap;
  }

  async getTeacherTotalSubjectCountMap(yearId: string) {
    const teachers = massSerialize(await Teacher.query()) as Teacher[];
    const teachersMap = {};

    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      const csts = massSerialize(
        await Cst.query()
          .where('teacher_id', teacher.id)
          .where('academic_year_id', yearId)
      ) as Cst[];
      let total = 0;

      csts.forEach((cst) => {
        total += cst.count;
      });
      teachersMap[teacher.user_id] = total;
    }

    return teachersMap;
  }

  async initializeGradeWeek() {
    const grades = massSerialize(await Grade.all()) as Grade[];
    const gradeMap = {};
    grades.forEach((grade) => {
      gradeMap[grade.id] = {};
      WEEK_DAYS.forEach((day) => {
        gradeMap[grade.id][day] = {};
        for (let i = 0; i < PERIOD_COUNT; i++) {
          gradeMap[grade.id][day][i] = null;
        }
      });
    });

    return gradeMap;
  }
}
