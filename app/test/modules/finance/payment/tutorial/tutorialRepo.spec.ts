import TutorialRepo from 'app/modules/finance/payment/tutorial/tutorialRepo';
import { Months, PaymentType } from 'app/modules/finance/payment/payment';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { TutorialFactory } from './tutorialFactory';

const tutorialRepo = new TutorialRepo();

transact('TutorialRepo.monthPaid', () => {
  test('returns true', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Tutorial,
    }).create();
    await TutorialFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    let paid = await tutorialRepo.monthPaid(
      payment.student_id,
      Months.Meskerem
    );
    expect(paid).to.be.true;

    paid = await tutorialRepo.monthPaid(payment.student_id, Months.Tikimt);
    expect(paid).to.be.false;
  });

  test('returns false for diff year', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const ay = await AcademicYearFactory.merge({ active: false }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).create();
    await TutorialFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await tutorialRepo.monthPaid(
      payment.student_id,
      Months.Meskerem
    );
    expect(paid).to.be.false;
  });

  test('returns false for diff payment type', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Fee,
    }).create();
    await TutorialFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await tutorialRepo.monthPaid(
      payment.student_id,
      Months.Meskerem
    );
    expect(paid).to.be.false;
  });
});
