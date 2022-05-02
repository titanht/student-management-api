import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import { massSerialize } from 'app/services/utils';
// import GradeStudent from './academic/gradeStudent/gradeStudent';

export default class TestController {
  async test({ response }: HttpContextContract) {
    return response.json({ version: '0.1' });
  }

  async test2({ request, params }: HttpContextContract) {
    return { par: request.params(), bod: request.body(), params };
  }
}
