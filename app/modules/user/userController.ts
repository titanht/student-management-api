import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import UserService from './userService';
import CUserVal from './cUserVal';
import EUserVal from './eUserVal';
import User from '../auth/user';

export default class UserController extends ApiController<User> {
  constructor(protected service = new UserService()) {
    super(service, {
      createValidator: CUserVal,
      editValidator: EUserVal,
    });
  }

  getRoleMap({ response }: HttpContextContract) {
    return response.json({ data: this.service.getRoleMap() });
  }
}
