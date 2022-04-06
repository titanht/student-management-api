import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { massSerialize } from 'app/services/utils';
import GradeStudent from './academic/gradeStudent/gradeStudent';

export default class TestController {
  async test({ response }: HttpContextContract) {
    return response.json({ version: '0.1' });
  }

  async test4({ request }: HttpContextContract) {
    const gss = massSerialize(await GradeStudent.query());
    let success = 0;

    const promises: Promise<any>[] = [];
    gss.forEach((gs) => {
      promises.push(
        GradeStudent.create({
          student_id: gs.student_id,
          grade_id: gs.grade_id,
          academic_year_id: '269eeafd-ae36-11ec-a622-14857f27d558',
        })
          .catch((_err) => {
            //
          })
          .then(() => success++)
      );
    });

    await Promise.all(promises);

    return success;
  }
}
