import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecurrentPaymentService from './lib/recurrentPaymentService';
import RecurrentPaymentPendingService from './recurrentPaymentPending/lib/recurrentPaymentPendingService';
import RecurrentStudentPaymentService from './recurrentStudentPayment/lib/recurrentStudentPaymentService';

export default class RecurrentPaymentController {
  async store({ request, response }: HttpContextContract) {
    const recurrentId = await RecurrentPaymentService.createRecurrent(request);

    response.json({ recurrentId });
  }

  async storePending({ request, response }: HttpContextContract) {
    await RecurrentPaymentPendingService.createPending(request);

    response.json({ data: true });
  }

  async storePayment({ request, response, auth }: HttpContextContract) {
    await RecurrentStudentPaymentService.createPayment(request, auth.user!.id);

    response.json({ data: true });
  }

  async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = await RecurrentPaymentService.findOne(id);

    response.json(data);
  }
}
