import { Repo } from 'app/modules/_shared/repo';
import RcsCst from './rcsCst';

export default class RcsCstRepo extends Repo<RcsCst> {
  constructor() {
    super(RcsCst);
  }

  async fetchStudentMarks(gradeStudentId: string) {
    const rcsCsts = await RcsCst.query()
      .whereHas('rcs', (builder) => {
        builder.where('grade_student_id', gradeStudentId);
      })
      .preload('rcs', (builder) => {
        builder.preload('semester');
      })
      .preload('cst', (builder) => {
        builder.preload('subject');
      });

    return rcsCsts.map((item) => item.serialize());
  }

  async createOrUpdate(
    cstScoreList: Record<string, number>,
    reportCardId: string
  ) {
    const promises: Promise<RcsCst>[] = [];
    Object.keys(cstScoreList).forEach((cstId) => {
      promises.push(
        RcsCst.updateOrCreate(
          { cst_id: cstId, rcs_id: reportCardId },
          { score: cstScoreList[cstId] }
        )
      );
    });

    await Promise.all(promises);
  }
}
