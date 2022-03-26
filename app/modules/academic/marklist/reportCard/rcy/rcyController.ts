import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Rcy from './rcy';
import RcyService from './rcyService';
import CRcyVal from './cRcyVal';
import ERcyVal from './eRcyVal';
import Grade from 'app/modules/academic/grade/grade';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';

export default class RcyController extends ApiController<Rcy> {
  constructor(protected service = new RcyService()) {
    super(service, {
      createValidator: CRcyVal,
      editValidator: ERcyVal,
    });
  }

  async updateRank({ request, response }: HttpContextContract) {
    const { gradeId, academicYearId } = request.params();
    await Grade.findOrFail(gradeId);
    await AcademicYear.findOrFail(academicYearId);
    await this.service.updateRank(gradeId, academicYearId);

    return response.status(200).json({ data: true });
  }

  async generate({ request, response }: HttpContextContract) {
    const { gradeStudentId, academicYearId } = request.params();
    await GradeStudent.findOrFail(gradeStudentId);
    await AcademicYear.findOrFail(academicYearId);
    await this.service.generateReport(gradeStudentId, academicYearId);

    return response.status(200).json({ data: true });
  }

  async generateClass({ request, response }: HttpContextContract) {
    const { gradeId, academicYearId } = request.params();

    await Grade.findOrFail(gradeId);
    await AcademicYear.findOrFail(academicYearId);
    await this.service.generateReportGrade(gradeId, academicYearId);

    return response.json({ data: true });
  }
}
