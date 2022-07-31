import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedPaymentService from './lib/fixedPaymentService';
import { FixedPaymentCreateVal } from './lib/fixedPaymentVal';

export default class FixedPaymentController {
  async create({ request, response }: HttpContextContract) {
    const filteredData = await request.validate(FixedPaymentCreateVal);
    const result = await FixedPaymentService.createFixed(filteredData);

    response.status(201).json(result);
  }
}
