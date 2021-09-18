import fs from 'fs';
import AcademicYearService from '../../academicYear/academicYearService';
import DataFetcher from './dataFetchService';
import ScheduleValidator from './scheduleValidator';

export class ScheduleCreator {
  static async createSchedule() {
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
    const classes = Object.keys(classSubjectWeeklyMap);

    await validator.validateGradeMaxPeriodCount(classSubjectWeeklyMap);
    // await validator.validateTeacherMaxPeriodCount(teacherTotalSubjectCountMap);

    fs.writeFileSync(
      `${__dirname}/out.json`,
      JSON.stringify(teacherTotalSubjectCountMap, null, 2)
    );
  }
}
