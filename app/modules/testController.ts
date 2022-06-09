import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GradeStudentService from './academic/gradeStudent/gradeStudentService';
// import { massSerialize } from 'app/services/utils';
// import GradeStudent from './academic/gradeStudent/gradeStudent';

export default class TestController {
  async test({ response }: HttpContextContract) {
    return await new GradeStudentService().fetchSkill(
      'aaa93e76-d488-4d56-bcf0-9082a3b2f354'
    );
  }

  async test2({ request, params }: HttpContextContract) {
    return { par: request.params(), bod: request.body(), params };
  }
}
