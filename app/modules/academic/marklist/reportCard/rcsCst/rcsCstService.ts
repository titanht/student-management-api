import Service from 'app/modules/_shared/service';
import { semesterMap } from 'app/modules/_shared/types';
import RcsCst from './rcsCst';
import RcsCstRepo from './rcsCstRepo';

export default class RcsCstService extends Service<RcsCst> {
  constructor() {
    super(new RcsCstRepo());
  }

  async fetchFormattedData(gradeStudentId: string) {
    const data = await (this.repo as RcsCstRepo).fetchStudentMarks(
      gradeStudentId
    );
    return this.formatStudentData(data);
  }

  formatStudentData(data: any[]) {
    const mappedData = {};
    data.forEach((item) => {
      const { subject } = item.cst.subject;
      const { semester } = item.rcs.semester;

      if (mappedData[subject] === undefined) {
        mappedData[subject] = {};
      }

      mappedData[subject][semesterMap[semester]] = item.score;
    });

    return mappedData;
  }
}
