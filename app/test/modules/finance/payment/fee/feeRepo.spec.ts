import FeeRepo from 'app/modules/finance/payment/fee/feeRepo';
import { Months, PaymentType } from 'app/modules/finance/payment/payment';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { FeeFactory } from './feeFactory';

const feeRepo = new FeeRepo();

transact('FeeRepo.monthPaid', () => {
  test('returns true', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Fee,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    let paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.true;

    paid = await feeRepo.monthPaid(payment.student_id, Months.Tikimt);
    expect(paid).to.be.false;
  });

  test('returns false for diff year', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const ay = await AcademicYearFactory.merge({ active: false }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.false;
  });

  test('returns false for diff payment type', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Tutorial,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.false;
  });
});
