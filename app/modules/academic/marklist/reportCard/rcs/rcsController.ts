import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Rcs from './rcs';
import RcsService from './rcsService';
import CRcsVal from './cRcsVal';
import ERcsVal from './eRcsVal';
import Semester from '../../semester/semester';
import Grade from 'app/modules/academic/grade/grade';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';

export default class RcsController extends ApiController<Rcs> {
  constructor(protected service = new RcsService()) {
    super(service, {
      createValidator: CRcsVal,
      editValidator: ERcsVal,
    });
  }

  async updateRank({ request, response }: HttpContextContract) {
    const { gradeId, semesterId } = request.params();
    await Grade.findOrFail(gradeId);
    await Semester.findOrFail(semesterId);
    await this.service.updateRank(gradeId, semesterId);

    return response.status(200).json({ data: true });
  }

  async generate({ request, response }: HttpContextContract) {
    const { gradeStudentId, semesterId } = request.params();
    await GradeStudent.findOrFail(gradeStudentId);
    await Semester.findOrFail(semesterId);
    await this.service.generateReport(gradeStudentId, semesterId);

    return response.status(200).json({ data: true });
  }

  async generateClass({ request, response }: HttpContextContract) {
    const { gradeId, semesterId } = request.params();

    await Grade.findOrFail(gradeId);
    await Semester.findOrFail(semesterId);
    await this.service.generateGradeReport(gradeId, semesterId);

    return response.json({ data: true });
  }
}
