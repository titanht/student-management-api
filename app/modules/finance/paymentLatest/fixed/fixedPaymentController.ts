import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedPaymentPendingService from './fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedStudentPaymentService from './fixedStudentPayment/lib/fixedStudentPaymentService';
import FixedPaymentService from './lib/fixedPaymentService';
import { FixedPaymentCreateVal } from './lib/fixedPaymentVal';

export default class FixedPaymentController {
  async create({ request, response }: HttpContextContract) {
    const filteredData = await request.validate(FixedPaymentCreateVal);
    const result = await FixedPaymentService.createFixed(filteredData);

    response.status(201).json(result);
  }

  async createPending({ request, response }: HttpContextContract) {
    await FixedPaymentPendingService.createPending(request);

    response.status(201).json({ data: true });
  }

  async createStudentPayment({ request, response, auth }: HttpContextContract) {
    await FixedStudentPaymentService.createPayment(request, auth.user!.id);

    response.status(201).json({ data: true });
  }

  async show({ request, response }: HttpContextContract) {
    const { id } = request.params();
    const payment = await FixedPaymentService.findOne(id);

    response.json(payment);
  }
}
