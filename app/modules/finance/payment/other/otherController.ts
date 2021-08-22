import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Other from './other';
import OtherService, { OtherData } from './otherService';
import COtherVal from './cOtherVal';
import EOtherVal from './eOtherVal';

export default class OtherController extends ApiController<Other> {
  constructor(protected service = new OtherService()) {
    super(service, {
      createValidator: COtherVal,
      editValidator: EOtherVal,
    });
  }

  async stage({ request, response }: HttpContextContract) {
    const data = await request.validate(COtherVal);
    await this.service.stage(data as OtherData);

    return response.status(201).json({ data: true });
  }
}
