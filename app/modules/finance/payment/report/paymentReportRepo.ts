import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import moment from 'moment';
import Fee from '../fee/fee';
import Payment, { PaymentType } from '../payment';

export type AttachmentArg = {
  startAttachment?: number;
  endAttachment?: number;
};

export default class PaymentReportRepo {
  async attachmentIntervalQuery(
    paymentType: PaymentType,
    { startAttachment, endAttachment }: AttachmentArg
  ) {
    const year = await AcademicYearService.getActive();
    let query = Payment.query()
      .where('payment_type', paymentType)
      .where('academic_year_id', year.id);
    if (startAttachment) {
      query.where('attachment', '>=', startAttachment);
    }
    if (endAttachment) {
      query.where('attachment', '<=', endAttachment);
    }

    const result = await query;
    let sumTotal = 0;
    result.forEach((i) => (sumTotal += i.fee));

    return {
      count: result.length,
      sum: sumTotal,
    };
  }

  async getAttachmentIntervalReport(arg: AttachmentArg) {
    const report = {
      fee: await this.attachmentIntervalQuery(PaymentType.Fee, arg),
      tutorial: await this.attachmentIntervalQuery(PaymentType.Tutorial, arg),
      registration: await this.attachmentIntervalQuery(
        PaymentType.Registration,
        arg
      ),
      summer: await this.attachmentIntervalQuery(PaymentType.Summer, arg),
      other: await this.attachmentIntervalQuery(PaymentType.Other, arg),
    };

    return report;
  }

  async intervalQuery(
    paymentType: PaymentType,
    startDate?: string,
    endDate?: string
  ) {
    const year = await AcademicYearService.getActive();
    let query = Payment.query()
      .where('payment_type', paymentType)
      .where('academic_year_id', year.id);
    let penaltyQuery = Fee.query().whereHas('payment', (paymentBuilder) => {
      paymentBuilder.where('academic_year_id', year.id);
    });
    if (startDate) {
      // console.log('startDate');
      query = query.where('created_at', '>=', `${startDate} 00:00:00`);
      penaltyQuery = penaltyQuery.where(
        'created_at',
        '>=',
        `${startDate} 00:00:00`
      );
    }
    if (endDate) {
      // console.log('endDate');
      query = query.where('created_at', '<=', `${endDate} 23:59:59`);
      penaltyQuery = penaltyQuery.where(
        'created_at',
        '<=',
        `${endDate} 23:59:59`
      );
    }
    const result = await query;
    let sumTotal = 0;
    result.forEach((i) => (sumTotal += i.fee));

    let penaltyResult = await penaltyQuery;
    let penaltyTotal = 0;
    penaltyResult.forEach((i) => (penaltyTotal += i.penalty));

    return {
      count: result.length,
      sum: sumTotal,
      penalty: penaltyTotal,
    };
  }

  async getDailyReport() {
    const day = moment().format('YYYY-MM-DD').toString();
    const report = {
      fee: await this.intervalQuery(PaymentType.Fee, day, day),
      tutorial: await this.intervalQuery(PaymentType.Tutorial, day, day),
      registration: await this.intervalQuery(
        PaymentType.Registration,
        day,
        day
      ),
      summer: await this.intervalQuery(PaymentType.Summer, day, day),
      other: await this.intervalQuery(PaymentType.Other, day, day),
    };

    return report;
  }

  async getIntervalReport(startDate: string, endDate: string) {
    const report = {
      fee: await this.intervalQuery(PaymentType.Fee, startDate, endDate),
      tutorial: await this.intervalQuery(
        PaymentType.Tutorial,
        startDate,
        endDate
      ),
      registration: await this.intervalQuery(
        PaymentType.Registration,
        startDate,
        endDate
      ),
      summer: await this.intervalQuery(PaymentType.Summer, startDate, endDate),
      other: await this.intervalQuery(PaymentType.Other, startDate, endDate),
    };

    return report;
  }
}
