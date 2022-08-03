import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecurrentPaymentService from './lib/recurrentPaymentService';

export default class RecurrentPaymentController {
  async store({ request, response }: HttpContextContract) {
    await RecurrentPaymentService.createRecurrent(request);

    response.json({ data: true });
  }
}
