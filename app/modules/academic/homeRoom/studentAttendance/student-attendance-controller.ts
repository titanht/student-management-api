import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import StudentAttendanceService from './_lib/student-attendance-service';

export default class StudentAttendanceController {
  async store({ request, response, auth }: HttpContextContract) {
    await StudentAttendanceService.create(request, auth.user!.id);

    response.json({ data: true });
  }
}
