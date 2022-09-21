import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import StudentAttendanceService from './_lib/student-attendance-service';

export default class StudentAttendanceController {
  async getGradeDateAttendance({ request, response }: HttpContextContract) {
    const { gradeId, date } = request.params();
    const attendances = await StudentAttendanceService.fetchGradeDateAttendance(
      gradeId,
      date
    );

    response.json(attendances);
  }

  async store({ request, response, auth }: HttpContextContract) {
    await StudentAttendanceService.create(request, auth.user!.id);

    response.json({ data: true });
  }

  async nonSent({ response }: HttpContextContract) {
    const msgs = await StudentAttendanceService.findUnsent();

    response.json(msgs);
  }
}
