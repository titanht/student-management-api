import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Rcq from './rcq';
import RcqService from './rcqService';
import CRcqVal from './cRcqVal';
import ERcqVal from './eRcqVal';
import Grade from 'app/modules/academic/grade/grade';
import Quarter from '../../quarter/quarter';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';

export default class RcqController extends ApiController<Rcq> {
  constructor(protected service = new RcqService()) {
    super(service, {
      createValidator: CRcqVal,
      editValidator: ERcqVal,
    });
  }

  async updateRank({ request, response }: HttpContextContract) {
    const { gradeId, quarterId } = request.params();

    await Grade.findOrFail(gradeId);
    await Quarter.findOrFail(quarterId);
    await this.service.updateRank(gradeId, quarterId);

    return response.status(200).json({ data: true });
  }

  async generate({ request, response }: HttpContextContract) {
    const { gradeStudentId, quarterId } = request.params();

    await GradeStudent.findOrFail(gradeStudentId);
    await Quarter.findOrFail(quarterId);
    await this.service.generateReport(gradeStudentId, quarterId);

    return response.status(200).json({ data: true });
  }

  async generateClass({ request, response }: HttpContextContract) {
    const { gradeId, quarterId } = request.params();

    await Grade.findOrFail(gradeId);
    await Quarter.findOrFail(quarterId);

    await this.service.generateGradeReport(gradeId, quarterId);
    await this.service.updateRank(gradeId, quarterId);

    return response.json({ data: true });
  }

  async rcqGradeQuarter({ request, response }: HttpContextContract) {
    const { gradeId, quarterId } = request.params();

    const data = await this.service.getQuarterGrade(gradeId, quarterId);

    return response.json(data);
  }
}
