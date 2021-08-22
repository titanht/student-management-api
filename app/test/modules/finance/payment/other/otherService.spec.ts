import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Other from 'app/modules/finance/payment/other/other';
import OtherService, {
  OtherData,
} from 'app/modules/finance/payment/other/otherService';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import { getCount } from 'app/services/utils';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { OtherFactory } from './otherFactory';

const otherService = new OtherService();

transact('OtherService', () => {
  test('update', async () => {
    const payment = await PaymentFactory.create();
    const other = await OtherFactory.merge({ payment_id: payment.id }).create();

    await otherService.update(other.id, {
      reason: '10',
      cash: 40,
    });

    const paymentUpdated = await Payment.findOrFail(payment.id);
    const otherUpdated = await Other.findOrFail(other.id);

    expect(paymentUpdated.cash).to.equal(40);
    expect(otherUpdated.reason).to.equal('10');
  });

  test('create', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const other = await OtherFactory.make();

    const otherNew = (await otherService.create(
      {
        ...payment.serialize(),
        ...other.serialize(),
      } as OtherData,
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete otherNew.id;

    expect(await getCount(Payment)).to.equal(1, 'Payment Count');
    expect(await getCount(Other)).to.equal(1, 'Other Count');
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(otherNew, {
      ...payment.serialize(),
      hidden: false,
      ...other.serialize(),
      payment_id: paymentNew.id,
      user_id: 'uid',
      attachment: 1,
      academic_year_id: ay.id,
      payment_type: PaymentType.Other,
    });
  });
});
