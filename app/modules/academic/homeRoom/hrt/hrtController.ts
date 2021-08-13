import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Hrt from './hrt';
import HrtService from './hrtService';
import CHrtVal from './cHrtVal';
import EHrtVal from './eHrtVal';

export default class HrtController extends ApiController<Hrt> {
  constructor(protected service = new HrtService()) {
    super(service, {
      createValidator: CHrtVal,
      editValidator: EHrtVal,
    });
  }

  async fetchGrade({ auth }: HttpContextContract) {
    const grade = await (this.service as HrtService).fetchGrade(auth);

    return { data: grade };
  }
}
