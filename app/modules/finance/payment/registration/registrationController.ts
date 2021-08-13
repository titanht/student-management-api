import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ApiController from 'app/modules/_shared/apiController';
import Registration from './registration';
import RegistrationService from './registrationService';
import CRegistrationVal from './cRegistrationVal';
import ERegistrationVal from './eRegistrationVal';

export default class RegistrationController extends ApiController<Registration> {
  constructor(protected service = new RegistrationService()) {
    super(service, {
      createValidator: CRegistrationVal,
      editValidator: ERegistrationVal,
    });
  }

  async store(ctx: HttpContextContract) {
    // console.log('Auth In registrationController', !!ctx.auth.user);
    return super.store(ctx);
  }
}
