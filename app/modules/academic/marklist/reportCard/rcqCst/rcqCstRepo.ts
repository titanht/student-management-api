import { Repo } from 'app/modules/_shared/repo';
import { CstScore } from '../rcq/rcqService';
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

  async createOrUpdate(cstScoreList: CstScore[], reportCardId: string) {
    const promises: Promise<RcqCst>[] = [];
    cstScoreList.forEach((cst) => {
      promises.push(
        RcqCst.updateOrCreate(
          { cst_id: cst.id, rcq_id: reportCardId },
          { score: cst.score }
        )
      );
    });
    await Promise.all(promises);
  }
}
