import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RecurrentPaymentService from './lib/recurrentPaymentService';
import RecurrentPaymentPendingService from './recurrentPaymentPending/lib/recurrentPaymentPendingService';
import RecurrentStudentPaymentService from './recurrentStudentPayment/lib/recurrentStudentPaymentService';

export default class RecurrentPaymentController {
  async store({ request, response }: HttpContextContract) {
    const recurrentId = await RecurrentPaymentService.createRecurrent(request);

    response.json({ recurrentId });
  }

  async edit({ request, response }: HttpContextContract) {
    const result = await RecurrentPaymentService.edit(request);

    response.json({ data: result });
  }

  async delete({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await RecurrentPaymentService.delete(id);

    response.json({ data: true });
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

  async getActive({ response }: HttpContextContract) {
    const data = await RecurrentPaymentService.findActive();

    response.json(data);
  }

  async getArchived({ response }: HttpContextContract) {
    const data = await RecurrentPaymentService.findArchived();

    response.json(data);
  }

  async getPendingByChild({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const data = await RecurrentPaymentPendingService.findByPaymentChild(id);

    response.json(data);
  }
}
