import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ApiController from 'app/modules/_shared/apiController';
import Registration from './registration';
import RegistrationService, { RegistrationData } from './registrationService';
import CRegistrationVal from './cRegistrationVal';
import ERegistrationVal from './eRegistrationVal';
import StageRegistrationVal from './stageRegistrationVal';

export default class RegistrationController extends ApiController<Registration> {
  constructor(protected service = new RegistrationService()) {
    super(service, {
      createValidator: CRegistrationVal,
      editValidator: ERegistrationVal,
    });
  }

  async stage({ request, response }: HttpContextContract) {
    const data = await request.validate(StageRegistrationVal);
    await this.service.stage(data as RegistrationData);

    return response.status(201).json({ data: true });
  }
}
