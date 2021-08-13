import { Repo } from 'app/modules/_shared/repo';
import { allPromises } from 'app/services/utils';
import { CstScore } from '../rcq/rcqService';
import RcyCst from './rcyCst';

export default class RcyCstRepo extends Repo<RcyCst> {
  constructor() {
    super(RcyCst);
  }

  async fetchStudentMarks(gradeStudentId: string) {
    const rcsCsts = await RcyCst.query()
      .whereHas('rcy', (builder) => {
        builder.where('grade_student_id', gradeStudentId);
      })
      .preload('rcy', (builder) => {
        builder.preload('academicYear');
      })
      .preload('cst', (builder) => {
        builder.preload('subject');
      });

    return rcsCsts.map((item) => item.serialize());
  }

  async createOrUpdate(cstScoreList: CstScore[], reportCardId: string) {
    await allPromises(cstScoreList, (cst) =>
      RcyCst.updateOrCreate(
        { cst_id: cst.id, rcy_id: reportCardId },
        { score: cst.score }
      )
    );
  }
}
