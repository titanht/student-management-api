import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import { Repo } from 'app/modules/_shared/repo';
import { allPromises } from 'app/services/utils';
import Cst from '../../cst/cst';
import { RankMap } from '../reportCardService';
import Rcy from './rcy';

export default class RcyRepo extends Repo<Rcy> {
  constructor() {
    super(Rcy);
  }

  async fetchReportCard(gradeStudentId: string) {
    const reports = await Rcy.query()
      .preload('academicYear')
      .where('grade_student_id', gradeStudentId);

    return reports.map((report) => report.serialize());
  }

  async fetchGradeYearCards(gradeId: string, academicYearId: string) {
    const rcys = await Rcy.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder
          .where('grade_id', gradeId)
          .where('academic_year_id', academicYearId);
      })
      .where('academic_year_id', academicYearId);
    return rcys.map((rcy) => rcy.serialize());
  }

  async updateRank(rcys: Rcy[], rankMap: RankMap) {
    await allPromises(rcys, async (rcy) =>
      Rcy.query().where('id', rcy.id).update({
        rank: rankMap[rcy.id],
      })
    );
  }

  async getYearSml(gradeStudentId: string, academicYearId: string) {
    const gs = await GradeStudent.findOrFail(gradeStudentId);
    const csts = await Cst.query()
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder.preload('smls', (smlBuilder) => {
          smlBuilder.where('grade_student_id', gradeStudentId);
        });
      })
      .whereHas('subject', (subBuilder) => {
        subBuilder.where('consider_for_rank', true);
      })
      .where('grade_id', gs.grade_id)
      .where('academic_year_id', academicYearId);

    return csts.map((cst) => cst.serialize());
  }
}
