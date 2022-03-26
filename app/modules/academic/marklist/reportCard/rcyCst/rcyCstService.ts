import Service from 'app/modules/_shared/service';
import RcyCst from './rcyCst';
import RcyCstRepo from './rcyCstRepo';

export default class RcyCstService extends Service<RcyCst> {
  constructor() {
    super(new RcyCstRepo());
  }

  async fetchFormattedData(gradeStudentId: string) {
    const data = await (this.repo as RcyCstRepo).fetchStudentMarks(
      gradeStudentId
    );
    return this.formatStudentData(data);
  }

  formatStudentData(data: any[]) {
    const mappedData = {};
    data.forEach((item) => {
      const { subject } = item.cst.subject;
      const { year } = item.rcy.academicYear;

      if (mappedData[subject] === undefined) {
        mappedData[subject] = {};
      }

      mappedData[subject][year] = item.score;
    });

    return mappedData;
  }
}
