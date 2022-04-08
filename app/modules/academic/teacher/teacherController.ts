import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Teacher from './teacher';
import TeacherService from './teacherService';
import CTeacherVal from './cTeacherVal';
import ETeacherVal from './eTeacherVal';
import UserRepo from 'app/modules/user/userRepo';

export default class TeacherController extends ApiController<Teacher> {
  constructor(protected service = new TeacherService()) {
    super(service, {
      createValidator: CTeacherVal,
      editValidator: ETeacherVal,
    });
  }

  async getNonTeachers({ response }: HttpContextContract) {
    const users = await new UserRepo().getNonTeacherUsers();

    return response.json({ data: users });
  }
}
