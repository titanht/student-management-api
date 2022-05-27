import Service from 'app/modules/_shared/service';
import AcademicYearService from '../../academicYear/academicYearService';
import Cst from './cst';
import CstRepo from './cstRepo';

export default class CstService extends Service<Cst> {
  constructor() {
    super(new CstRepo());
  }

  // TODO: Unit test
  async getGradeCST(gradeId: string) {
    const year = await AcademicYearService.getActive();

    const csts = await Cst.query()
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId)
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder.preload('quarter').preload('evaluationType');
      })
      .preload('academicYear')
      .preload('grade')
      .preload('subject')
      .preload('teacher', (tb) => {
        tb.preload('user');
      });

    return csts;
  }

  // TODO: Unit test
  async getGradeYearCST(gradeId: string) {
    const year = await AcademicYearService.getActive();

    const csts = await Cst.query()
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId)
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .preload('quarter', (qb) => {
            qb.preload('semester');
          })
          .preload('smls', (smlBuilder) => {
            smlBuilder.preload('gradeStudent');
          })
          .preload('evaluationType');
      })
      .preload('grade')
      .preload('subject')
      .preload('teacher', (tb) => {
        tb.preload('user');
      });

    return csts;
  }

  // TODO: Unit test
  async getGradeSemesterCST(gradeId: string, semesterId: string) {
    const year = await AcademicYearService.getActive();

    const csts = await Cst.query()
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId)
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .whereHas('quarter', (qb) => {
            qb.where('semester_id', semesterId);
          })
          .preload('quarter', (qb) => {
            qb.preload('semester');
          })
          .preload('smls', (smlBuilder) => {
            smlBuilder.preload('gradeStudent');
          })
          .preload('evaluationType');
      })
      .preload('grade')
      .preload('subject')
      .preload('teacher', (tb) => {
        tb.preload('user');
      });

    return csts;
  }

  async getGradeQuarterCST(gradeId: string, quarterId: string) {
    const year = await AcademicYearService.getActive();

    const csts = await Cst.query()
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId)
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .where('quarter_id', quarterId)
          .preload('quarter')
          .preload('smls', (smlBuilder) => {
            smlBuilder.preload('gradeStudent');
          })
          .preload('evaluationType');
      })
      .preload('grade')
      .preload('subject')
      .preload('teacher', (tb) => {
        tb.preload('user');
      });

    return csts;
  }

  // TODO: Unit test
  async getQuarterCst(cstId: string, quarterId: string) {
    const cst = await Cst.query()
      .preload('evaluationMethods', (emBuilder) => {
        emBuilder
          .where('quarter_id', quarterId)
          .preload('quarter')
          .preload('smls', (smlBuilder) => {
            smlBuilder.preload('gradeStudent');
          })
          .preload('evaluationType');
      })
      .preload('grade')
      .preload('subject')
      .preload('teacher', (tb) => {
        tb.preload('user');
      })
      .where('id', cstId)
      .firstOrFail();

    return cst as Cst;
  }
}
