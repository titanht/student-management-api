import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Fee from 'app/modules/finance/payment/fee/fee';
import FeeService from 'app/modules/finance/payment/fee/feeService';
import Payment from 'app/modules/finance/payment/payment';
import { getCount } from 'app/services/utils';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { FeeFactory } from './feeFactory';

const feeService = new FeeService();

transact('FeeService', () => {
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
      },
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete feeNew.id;

    expect(await getCount(Payment)).to.equal(1);
    expect(await getCount(Fee)).to.equal(1);
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(feeNew, {
      ...payment.serialize(),
      hidden: false,
      ...fee.serialize(),
      payment_id: paymentNew.id,
      user_id: 'uid',
      attachment: 1,
      academic_year_id: ay.id,
    });
  });
});
