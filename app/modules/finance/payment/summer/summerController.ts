import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Summer from './summer';
import SummerService, { SummerData } from './summerService';
import CSummerVal from './cSummerVal';
import ESummerVal from './eSummerVal';
import StageSummerVal from './stageSummerVal';

export default class SummerController extends ApiController<Summer> {
  constructor(protected service = new SummerService()) {
    super(service, {
      createValidator: CSummerVal,
      editValidator: ESummerVal,
    });
  }

  async stage({ request, response }: HttpContextContract) {
    const data = await request.validate(StageSummerVal);
    await this.service.stage(data as SummerData);

    return response.status(201).json({ data: true });
  }
}
