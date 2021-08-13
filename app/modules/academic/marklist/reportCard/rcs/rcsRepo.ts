import { Repo } from 'app/modules/_shared/repo';
import { allPromises } from 'app/services/utils';
import GradeStudent from '../../../gradeStudent/gradeStudent';
import Cst from '../../cst/cst';
import { RankMap } from '../reportCardService';
import Rcs from './rcs';

export default class RcsRepo extends Repo<Rcs> {
  constructor() {
    super(Rcs);
  }

  async fetchReportCard(gradeStudentId: string) {
    const reports = await Rcs.query()
      .preload('semester')
      .where('grade_student_id', gradeStudentId);

    return reports.map((report) => report.serialize());
  }

  async fetchGradeSemesterCards(
    gradeId: string,
    semesterId: string,
    academicYearId: string
  ) {
    const rcqs = await Rcs.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder
          .where('grade_id', gradeId)
          .where('academic_year_id', academicYearId);
      })
      .where('semester_id', semesterId);

    return rcqs.map((rcq) => rcq.serialize());
  }

  async updateRank(rcss: Rcs[], rankMap: RankMap) {
    await allPromises(rcss, async (rcs) =>
      Rcs.query().where('id', rcs.id).update({
        rank: rankMap[rcs.id],
      })
    );
  }

  async getSemesterSml(gradeStudentId: string, semesterId: string) {
    const gs = await GradeStudent.findOrFail(gradeStudentId);
    const csts = await Cst.query()
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .whereHas('quarter', (quarterBuilder) => {
            quarterBuilder.where('semester_id', semesterId);
          })
          .preload('smls', (smlBuilder) => {
            smlBuilder.where('grade_student_id', gradeStudentId);
          });
      })
      .whereHas('subject', (subBuilder) => {
        subBuilder.where('consider_for_rank', true);
      })
      .where('academic_year_id', gs.academic_year_id)
      .where('grade_id', gs.grade_id);

    return csts.map((cst) => cst.serialize());
  }
}
