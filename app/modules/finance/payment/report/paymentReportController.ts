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

  async attachmentInterval({ response, request }: HttpContextContract) {
    const { start_attachment, end_attachment } = request.body();
    const reports = await new PaymentReportService().attachmentInterval({
      startAttachment: parseInt(start_attachment, 10),
      endAttachment: parseInt(end_attachment, 10),
    });

    return response.json({ data: reports });
  }
}
