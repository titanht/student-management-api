import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import GradeStudent from './gradeStudent';
import GradeStudentService from './gradeStudentService';
import CGradeStudentVal from './cGradeStudentVal';
import EGradeStudentVal from './eGradeStudentVal';
import ChangeGradeVal from './changeGradeVal';
import PromoteGradeStudentVal from './promoteGradeStudentVal';
import ChangeStudentGradeVal from './changeStudentGradeVal';
import ChangeMultiStudentGradeVal from './changeMultiStudentGradeVal';

export default class GradeStudentController extends ApiController<GradeStudent> {
  constructor(protected service = new GradeStudentService()) {
    super(service, {
      createValidator: CGradeStudentVal,
      editValidator: EGradeStudentVal,
    });
  }

  async gradeWithStudents({ request, response }: HttpContextContract) {
    const { yearId } = request.params();
    const data = await this.service.gradeWithStudents(yearId);

    return response.json(data);
  }

  async allYearGradeStudents({ request, response }: HttpContextContract) {
    const { yearId } = request.params();
    const data = await this.service.allYearGradeStudents(yearId);

    response.json(data);
  }

  async yearGradeStudents({ request, response }: HttpContextContract) {
    const { yearId, gradeId } = request.params();
    const data = await this.service.yearGradeStudents(yearId, gradeId);

    response.json(data);
  }

  async yearStudents({ request, response }: HttpContextContract) {
    const { gradeId, yearId } = request.params();

    const data = await this.service.yearStudents(gradeId, yearId);

    return response.json(data);
  }

  async changeMultiStudentGrade({ request, response }: HttpContextContract) {
    const { student_ids, year_id, grade_id } = await request.validate(
      ChangeMultiStudentGradeVal
    );
    await this.service.changeMultiStudentGrade(student_ids, grade_id, year_id);

    return response.json({ data: true });
  }

  async changeStudentGrade({ request, response }: HttpContextContract) {
    const data = await request.validate(ChangeStudentGradeVal);
    await this.service.changeStudentGrade(data.student_id, data.grade_id);

    return response.status(200).json({});
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
