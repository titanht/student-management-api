import { Repo } from 'app/modules/_shared/repo';
import { allPromises } from 'app/services/utils';
import { CstScore } from '../rcq/rcqService';
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

  async createOrUpdate(cstScoreList: CstScore[], reportCardId: string) {
    await allPromises(cstScoreList, (cst) =>
      RcsCst.updateOrCreate(
        { cst_id: cst.id, rcs_id: reportCardId },
        { score: cst.score }
      )
    );
  }
}
