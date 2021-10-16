import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Fee from 'app/modules/finance/payment/fee/fee';
import FeeService, {
  FeeData,
} from 'app/modules/finance/payment/fee/feeService';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import { getCount } from 'app/services/utils';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { GradeFactory } from 'app/test/modules/academic/grade/gradeFactory';
import { GradeStudentFactory } from 'app/test/modules/academic/gradeStudent/gradeStudentFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { FeeFactory } from './feeFactory';

const feeService = new FeeService();

transact('FeeService', () => {
  test.only('unpaidSummary', async () => {
    const grade1 = (
      await GradeFactory.merge({ monthly_fee: 100 }).create()
    ).serialize();
    const grade2 = (
      await GradeFactory.merge({ monthly_fee: 200 }).create()
    ).serialize();
    const s1 = {
      scholarship_amount: 10,
      gradeStudents: [{ grade: grade1 }],
    };
    const s2 = {
      scholarship_amount: 0,
      gradeStudents: [{ grade: grade2 }],
    };
  });

  test('stage', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const fee = await FeeFactory.make();

    await feeService.stage({ ...payment, ...fee } as FeeData);

    expect(await getCount(StagePayment)).to.equal(1);
    expect((await StagePayment.firstOrFail()).type).to.equal(PaymentType.Fee);
  });

  test('update', async () => {
    const payment = await PaymentFactory.create();
    const fee = await FeeFactory.merge({ payment_id: payment.id }).create();

    await feeService.update(fee.id, {
      penalty: 10,
      cash: 40,
    });

    const paymentUpdated = await Payment.findOrFail(payment.id);
    const feeUpdated = await Fee.findOrFail(fee.id);

    expect(paymentUpdated.cash).to.equal(40);
    expect(feeUpdated.penalty).to.equal(10);
  });

  test('create', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const fee = await FeeFactory.make();

    const feeNew = (await feeService.create(
      {
        ...payment.serialize(),
        ...fee.serialize(),
      } as FeeData,
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete feeNew.id;

    expect(await getCount(Payment)).to.equal(1, 'Payment Count');
    expect(await getCount(Fee)).to.equal(1, 'Fee Count');
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(feeNew, {
      ...payment.serialize(),
      hidden: false,
      ...fee.serialize(),
      payment_id: paymentNew.id,
      user_id: 'uid',
      academic_year_id: ay.id,
    });
  });
});
