import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import GradeStudent from './gradeStudent';
import GradeStudentService from './gradeStudentService';
import CGradeStudentVal from './cGradeStudentVal';
import EGradeStudentVal from './eGradeStudentVal';
import ChangeGradeVal from './changeGradeVal';
import PromoteGradeStudentVal from './promoteGradeStudentVal';

export default class GradeStudentController extends ApiController<GradeStudent> {
  constructor(protected service = new GradeStudentService()) {
    super(service, {
      createValidator: CGradeStudentVal,
      editValidator: EGradeStudentVal,
    });
  }

  async changeGrade({ request, response }: HttpContextContract) {
    const data = await request.validate(ChangeGradeVal);
    const gradeStudentId = request.params().gradeStudentId;
    await this.service.changeGrade(gradeStudentId, data.grade_id);

    return response.status(200).json({});
  }

  async promoteGrade({ request, response }: HttpContextContract) {
    const data = await request.validate(PromoteGradeStudentVal);
    const { student_ids, grade_id, academic_year_id } = data;
    await this.service.promoteGrade(student_ids, grade_id, academic_year_id);

    return response.status(201).json({ data: true });
  }
}
