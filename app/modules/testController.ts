import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import { massSerialize } from 'app/services/utils';
// import GradeStudent from './academic/gradeStudent/gradeStudent';

export default class TestController {
  async test({ response }: HttpContextContract) {
    return response.json({ version: '0.1' });
  }

  async test4({ request }: HttpContextContract) {
    return { data: request.body() };
  }
}
