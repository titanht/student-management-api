import Student from 'app/modules/academic/student/student';
import { Repo } from 'app/modules/_shared/repo';
import { getQueryCount } from 'app/services/utils';
import { PaymentType } from '../payment';
import StagePayment from './stagePayment';

export default class StagePaymentRepo extends Repo<StagePayment> {
  constructor() {
    super(StagePayment);
  }

  async getStageCount(type: PaymentType) {
    return getQueryCount(StagePayment.query().where('type', type));
  }

  async removeAll() {
    await StagePayment.query().delete();
  }

  async getSummaryOfType(type: PaymentType) {
    const payments = await StagePayment.query().where('type', type);
    // console.log(payments);
    let total = 0;
    const data: object[] = [];
    for (let i = 0; i < payments.length; i++) {
      const fee = JSON.parse(payments[i].data);
      total += fee.fee;
      const student = (await Student.findOrFail(fee.student_id)).serialize();
      data.push({
        student,
        fee: {
          stage_id: payments[i].id,
          ...fee,
        },
      });
    }

    return {
      count: payments.length,
      total,
      data,
    };
  }

  async getSummary() {
    const totalSummary = {
      count: 0,
      total: 0,
    };
    const paymentTypes = Object.values(PaymentType);

    for (let i = 0; i < paymentTypes.length; i++) {
      const summary = await this.getSummaryOfType(paymentTypes[i]);
      totalSummary.count += summary.count;
      totalSummary.total += summary.total;
      totalSummary[paymentTypes[i]] = summary;
    }

    return totalSummary;
  }
}
