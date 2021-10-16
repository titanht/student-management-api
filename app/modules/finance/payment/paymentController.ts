import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Payment from './payment';
import PaymentService from './paymentService';

export default class FeeController extends ApiController<Payment> {
  constructor(protected service = new PaymentService()) {
    super(service, {});
  }
}
