import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Payment from '../payment';
import PaymentReportService from './paymentReportService';

export default class StagePaymentController extends ApiController<Payment> {
  async daily({ response }: HttpContextContract) {
    const reports = await new PaymentReportService().daily();

    return response.json({ data: reports });
  }

  async interval({ response, request }: HttpContextContract) {
    const { start_date, end_date } = request.body();
    const reports = await new PaymentReportService().interval(
      start_date,
      end_date
    );

    return response.json({ data: reports });
  }
}
