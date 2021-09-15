import moment from 'moment';
import Fee from '../fee/fee';
import Payment, { PaymentType } from '../payment';

export default class PaymentReportRepo {
  async intervalQuery(
    paymentType: PaymentType,
    startDate?: string,
    endDate?: string
  ) {
    console.log(startDate);
    let query = Payment.query().where('payment_type', paymentType);
    let penaltyQuery = Fee.query();
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
