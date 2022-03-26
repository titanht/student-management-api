import { Months, PaymentType } from 'app/modules/finance/payment/payment';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import StagePaymentRepo from 'app/modules/finance/payment/stagePayment/stagePaymentRepo';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { FeeFactory } from '../fee/feeFactory';
import { PaymentFactory } from '../paymentFactory';
import { StagePaymentFactory } from './stagePaymentFactory';

const stageRepo = new StagePaymentRepo();

transact('StageRepo.getTypeSummary', () => {
  test('feeStaged', async () => {
    const studentId = 'stud';
    const month = Months.Meskerem;

    let staged = await stageRepo.paymentStaged(
      studentId,
      PaymentType.Fee,
      month
    );
    expect(staged).to.be.false;

    await StagePayment.create({
      data: JSON.stringify({ student_id: studentId, month }),
      type: PaymentType.Fee,
    });

    staged = await stageRepo.paymentStaged(studentId, PaymentType.Fee, month);
    expect(staged).to.be.true;

    // False for other student
    staged = await stageRepo.paymentStaged('studentId', PaymentType.Fee, month);
    expect(staged).to.be.false;

    // False for diff month
    staged = await stageRepo.paymentStaged(
      studentId,
      PaymentType.Fee,
      Months.Ginbot
    );
    expect(staged).to.be.false;

    // False for diff payment type on same month
    staged = await stageRepo.paymentStaged(
      studentId,
      PaymentType.Tutorial,
      month
    );
    expect(staged).to.be.false;

    /** Check Registration */
    // False for diff payment type on same month
    staged = await stageRepo.paymentStaged(
      studentId,
      PaymentType.Registration,
      null
    );
    expect(staged).to.be.false;

    await StagePayment.create({
      data: JSON.stringify({ student_id: studentId, month }),
      type: PaymentType.Registration,
    });

    staged = await stageRepo.paymentStaged(
      studentId,
      PaymentType.Registration,
      null
    );
    expect(staged).to.be.true;
  });

  test('returns summary by type', async () => {
    const student = await StudentFactory.create();
    const payment = await PaymentFactory.merge({
      student_id: student.id,
      payment_type: PaymentType.Fee,
    }).make();
    const fee = await FeeFactory.make();
    const stage = await StagePaymentFactory.merge({
      data: JSON.stringify({
        ...payment.serialize(),
        ...fee.serialize(),
      }),
      type: PaymentType.Fee,
    }).create();

    const summary = await stageRepo.getSummaryOfType(PaymentType.Fee);

    expect(summary.count).to.equal(1);
    expect(summary.total).to.equal(payment.fee);
    expectExceptTimestamp((summary.data[0] as any).fee, {
      ...payment.serialize(),
      ...fee.serialize(),
      stage_id: stage.id,
    });
    expectExceptTimestamp(
      (summary.data[0] as any).student,
      student.serialize()
    );
  });

  test('returns empty', async () => {
    const summary = await stageRepo.getSummaryOfType(PaymentType.Fee);

    expect(summary).to.deep.equal({ total: 0, count: 0, data: [] });
  });
});
