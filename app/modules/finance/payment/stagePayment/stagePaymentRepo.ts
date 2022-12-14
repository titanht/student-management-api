import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Student from 'app/modules/academic/student/student';
import { Repo } from 'app/modules/_shared/repo';
import { getQueryCount } from 'app/services/utils';
import { Months, PaymentType } from '../payment';
import StagePayment from './stagePayment';

export default class StagePaymentRepo extends Repo<StagePayment> {
  constructor() {
    super(StagePayment);
  }

  async paymentStaged(
    studentId: string,
    type: PaymentType,
    month?: Months | null
  ) {
    const stages = this.massSerialize(await this.findAll());
    const paymentIndex = stages.findIndex((stage: StagePayment) => {
      const parsedData = JSON.parse(stage.data);
      let staged = parsedData.student_id === studentId && stage.type === type;
      if (month) {
        staged = staged && parsedData.month === month;
      }

      return staged;
    });

    return paymentIndex !== -1;
  }

  async fetchAll() {
    const year = await AcademicYearService.getActive();
    const stages = (await StagePayment.query()).map((i) => i.serialize());
    for (let i = 0; i < stages.length; i++) {
      const studentId = JSON.parse(stages[i].data).student_id;
      const student = await Student.query()
        .where('id', studentId)
        .preload('gradeStudents', (gsBuilder) => {
          gsBuilder.where('academic_year_id', year.id).preload('grade');
        })
        .first();
      stages[i].student = student;
    }

    return stages;
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
    let penaltyTotal = 0;
    const data: object[] = [];
    for (let i = 0; i < payments.length; i++) {
      const fee = JSON.parse(payments[i].data);
      total += fee.fee;
      if (type === PaymentType.Fee) {
        penaltyTotal += fee.penalty;
      }
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
      penaltyTotal: type === PaymentType.Fee ? penaltyTotal : undefined,
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
