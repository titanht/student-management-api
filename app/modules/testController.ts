import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { padZeros } from 'app/services/utils/stringUtils';
import Student from './academic/student/student';

export default class TestController {
  async test({}: HttpContextContract) {
    const students = await Student.query().orderBy('first_name');

    let counter = 1;
    let promises: Promise<any>[] = [];
    for (let i = 0; i < students.length; i++) {
      promises.push(
        Student.query()
          .where('id', students[i].id)
          .update({
            id_number: `SA/${padZeros(counter, 5)}/15`,
            id_counter: counter++,
          })
      );

      if (i > 0 && i % 10 === 0) {
        await Promise.all(promises);
        promises = [];
      }
    }

    await Promise.all(promises);

    return 'test';
  }

  async test2({ request, params }: HttpContextContract) {
    return { par: request.params(), bod: request.body(), params };
  }
}
