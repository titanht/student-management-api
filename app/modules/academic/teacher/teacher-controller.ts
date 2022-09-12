import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserService from 'app/modules/user/_lib/user-service';
import TeacherService from './_lib/teacher-service';

export default class TeacherController {
  async index({ response }: HttpContextContract) {
    const teachers = await TeacherService.findAll();

    return response.json({ data: teachers });
  }

  async store({ request, response }: HttpContextContract) {
    const teacher = await TeacherService.create(request);

    response.status(201).json(teacher);
  }

  async getNonTeachers({ response }: HttpContextContract) {
    const users = await UserService.findNonTeachers();

    response.json({ data: users });
  }
}
