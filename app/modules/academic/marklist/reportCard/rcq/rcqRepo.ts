import { Repo } from 'app/modules/_shared/repo';
import { allPromises } from 'app/services/utils';
import GradeStudent from '../../../gradeStudent/gradeStudent';
import Cst from '../../cst/cst';
import { RankMap } from '../reportCardService';
import Rcq from './rcq';

export default class RcqRepo extends Repo<Rcq> {
  constructor() {
    super(Rcq);
  }

  async fetchReportCard(gradeStudentId: string) {
    const reports = await Rcq.query()
      .preload('quarter')
      .where('grade_student_id', gradeStudentId);

    return reports.map((report) => report.serialize());
  }

  async fetchGradeQuarterCards(
    gradeId: string,
    quarterId: string,
    academicYearId: string
  ) {
    const rcqs = await Rcq.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder
          .where('grade_id', gradeId)
          .where('academic_year_id', academicYearId);
      })
      .where('quarter_id', quarterId);

    return rcqs.map((rcq) => rcq.serialize());
  }

  async updateRank(rcqs: Rcq[], rankMap: RankMap) {
    await allPromises(rcqs, async (rcq) =>
      Rcq.query().where('id', rcq.id).update({
        rank: rankMap[rcq.id],
      })
    );
  }

  async getQuarterSml(gradeStudentId: string, quarterId: string) {
    const gs = (await GradeStudent.findOrFail(gradeStudentId)).serialize();
    const cst = await Cst.query()
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .where('quarter_id', quarterId)
          .preload('smls', (smlBuilder) => {
            smlBuilder.where('grade_student_id', gradeStudentId);
          });
      })
      .whereHas('subject', (subBuilder) => {
        subBuilder.where('consider_for_rank', true);
      })
      .where('academic_year_id', gs.academic_year_id)
      .where('grade_id', gs.grade_id);

    return cst.map((c) => c.serialize());
  }
}
