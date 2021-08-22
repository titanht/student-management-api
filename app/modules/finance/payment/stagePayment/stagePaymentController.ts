import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import StagePayment from './stagePayment';
import StagePaymentService from './stagePaymentService';
import CStagePaymentVal from './cStagePaymentVal';
import EStagePaymentVal from './eStagePaymentVal';

export default class StagePaymentController extends ApiController<StagePayment> {
  constructor(protected service = new StagePaymentService()) {
    super(service, {
      createValidator: CStagePaymentVal,
      editValidator: EStagePaymentVal,
    });
  }

  async getFs({ response }: HttpContextContract) {
    const fs = await this.service.getFs();

    return response.json({ data: fs });
  }

  async isPending({ response }: HttpContextContract) {
    const isPending = await this.service.isPending();

    return response.json({ data: isPending });
  }

  async isPendingType({ request, response }: HttpContextContract) {
    const { type } = request.params();
    const isPending = await this.service.isPendingType(type);

    return response.json({ data: isPending });
  }

  async commit({ response, auth }: HttpContextContract) {
    const commitData = await this.service.commit(auth);

    return response.json({ data: commitData });
  }

  async summary({ response }: HttpContextContract) {
    const summary = await this.service.getSummary();

    return response.json({ data: summary });
  }
}
