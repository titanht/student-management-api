import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import { pickFields, transactLocalized } from 'app/services/utils';
import Payment, { Months, PaymentType } from '../payment';
import PaymentService from '../paymentService';
import { StageExtra } from '../stagePayment/stagePaymentService';
import Fee from './fee';
import FeeRepo from './feeRepo';
import { UnpaidStudent } from './types/unpaidStudent';

export interface FeeData extends Fee, Payment {}

export default class FeeService extends Service<Fee> {
  protected paymentService: PaymentService;

  constructor() {
    super(new FeeRepo());
    this.paymentService = new PaymentService();
  }

  async getNonPaidMonths(studentId: string) {
    return (this.repo as FeeRepo).nonPaidMonths(studentId);
  }

  async stage(createData: FeeData) {
    return this.paymentService.stagePayment(createData, PaymentType.Fee);
  }

  async create(createData: FeeData, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Fee },
        auth
      );
      const fee = await this.repo.createModelTrx(trx, {
        payment_id: payment.id,
        ...pickFields(createData, ['penalty', 'month', 'scholarship']),
      });
      data = { ...payment.serialize(), ...fee.serialize() };
    });

    return data as Fee;
  }

  async stageTrx(
    trx: TransactionClientContract,
    createData: FeeData,
    auth: AuthContract,
    extra: StageExtra
  ) {
    let data = {};

    const payment = await this.paymentService.createTrx(
      trx,
      { ...createData, payment_type: PaymentType.Fee },
      auth,
      extra
    );
    const fee = await this.repo.createModelTrx(trx, {
      payment_id: payment.id,
      ...pickFields(createData, ['penalty', 'month', 'scholarship']),
    });
    data = { ...payment.serialize(), ...fee.serialize() };

    return data as Fee;
  }

  async update(id: string, editData: Partial<FeeData>) {
    let data = {};

    const fee = await Fee.findOrFail(id);

    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, fee.payment_id, editData);
      const feeUpdate = await this.repo.updateModelTrx(
        trx,
        id,
        pickFields(editData, ['penalty', 'month', 'scholarship'])
      );
      data = {
        ...feeUpdate.serialize(),
      };
    });

    return data as Fee;
  }

  async unpaidByMonth(month: string) {
    const year = await AcademicYearService.getActive();
    const report = await (this.repo as FeeRepo).unpaidMonth(month, year.id);

    return {
      summary: this.unpaidSummary(report as unknown as UnpaidStudent[]),
      report: this.processReport(report, month as Months),
    };
  }

  async unpaidMonthGrade(month: string, gradeId: string) {
    const year = await AcademicYearService.getActive();
    const report = await (this.repo as FeeRepo).unpaidMonthGrade(
      month,
      gradeId,
      year.id
    );

    return {
      summary: this.unpaidSummary(report as unknown as UnpaidStudent[]),
      report: this.processReport(report, month as Months),
    };
  }

  unpaidSummary(unpaidList: UnpaidStudent[]) {
    let totalUnpaid = 0;
    // console.log();

    unpaidList.forEach((student) => {
      totalUnpaid +=
        student.gradeStudents[0].grade.monthly_fee -
        (student.scholarship_amount || 0);
    });

    return { totalUnpaid, totalCount: unpaidList.length };
  }

  processReport(report: any, month: Months) {
    const months = Object.values(Months);
    const curMonthIndex = months.indexOf(month);
    const monthsFiltered = months.slice(0, curMonthIndex + 1);

    return report.map((report) => {
      const paidMonths = report.payments.map(
        (payment) => payment.feePayment.month
      );
      const unpaidMonths = monthsFiltered.filter(
        (i) => !paidMonths.includes(i)
      );

      delete (report as any).payments;
      report.unpaidMonths = unpaidMonths;
      return report;
    });
  }
}
