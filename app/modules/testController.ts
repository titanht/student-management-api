import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import FixedStudentPayment from './finance/paymentLatest/fixed/fixedStudentPayment/fixedStudentPayment';

export default class TestController {
  async test({}: HttpContextContract) {
    return FixedStudentPayment.query().paginate(1, 10);
  }

  async test2({ request, params }: HttpContextContract) {
    return { par: request.params(), bod: request.body(), params };
  }
}
