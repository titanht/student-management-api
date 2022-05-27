import { Repo } from 'app/modules/_shared/repo';
import RcqCst from './rcqCst';

export default class RcqCstRepo extends Repo<RcqCst> {
  constructor() {
    super(RcqCst);
  }

  async fetchStudentMarks(gradeStudentId: string) {
    const rcqCsts = await RcqCst.query()
      .whereHas('rcq', (builder) => {
        builder.where('grade_student_id', gradeStudentId);
      })
      .preload('rcq', (builder) => {
        builder.preload('quarter');
      })
      .preload('cst', (builder) => {
        builder.preload('subject');
      });

    return rcqCsts.map((item) => item.serialize());
  }

  // TODO: Unit test
  async createOrUpdate(
    cstScoreList: Record<string, number>,
    reportCardId: string
  ) {
    const promises: Promise<RcqCst>[] = [];
    Object.keys(cstScoreList).forEach((cstId) => {
      promises.push(
        RcqCst.updateOrCreate(
          { cst_id: cstId, rcq_id: reportCardId },
          { score: cstScoreList[cstId] }
        )
      );
    });

    await Promise.all(promises);
  }
}
