import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AcademicYearService from './academic/academicYear/academicYearService';
import Payment, { Months, PaymentType } from './finance/payment/payment';

export default class TestController {
  async test({ request, response }: HttpContextContract) {
    await this.clearRegistration();
    console.log('');
    await this.clearFees();

    response.json({ data: true });
  }

  async clearRegistration() {
    const yearId = (await AcademicYearService.getActive()).id;
    const payments = await Payment.query()
      .where('academic_year_id', yearId)
      .where('payment_type', PaymentType.Registration);
    console.log(payments.length);
    const paidMap = {};
    const deletables: string[] = [];
    payments.forEach(({ id, attachment, student_id }) => {
      const key = `${student_id}-${attachment}`;
      if (!paidMap[key]) {
        paidMap[key] = true;
      } else {
        deletables.push(id);
      }
    });

    // await Payment.query().whereIn('id', deletables).delete();
    console.log('Registration delete', deletables.length);
  }

  async clearFees() {
    const months = Object.values(Months);
    const yearId = (await AcademicYearService.getActive()).id;

    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      const payments = await Payment.query()
        .whereHas('feePayment', (feeBuilder) => {
          feeBuilder.where('month', month);
        })
        .where('academic_year_id', yearId)
        .where('payment_type', PaymentType.Fee);

      const paidMap = {};
      const deletables: string[] = [];
      payments.forEach(({ id, attachment, student_id }) => {
        const key = `${student_id}-${attachment}`;
        if (!paidMap[key]) {
          paidMap[key] = true;
        } else {
          deletables.push(id);
        }
      });

      // await Payment.query().whereIn('id', deletables).delete();
      console.log('Fee delete', payments.length, month, deletables.length);
    }
  }
}
