import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Payment from 'app/modules/finance/payment/payment';
import PaymentService from 'app/modules/finance/payment/paymentService';
import { getCount, transactLocalized } from 'app/services/utils';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { DateTime } from 'luxon';
import { AcademicYearFactory } from '../../academic/academicYear/academicFactory';
import { PaymentFactory } from './paymentFactory';

const paymentService = new PaymentService();

transact('PaymentService', () => {
  test('update', async () => {
    const payment = await PaymentFactory.merge({
      hidden: false,
      slip_date: '2020-01-01' as unknown as DateTime,
    }).create();
    await paymentService.update(payment.id, { fee: 20, hidden: true });

    const paymentNew = (await Payment.firstOrFail())?.serialize() as Record<
      string,
      any
    >;
    expectExceptTimestamp(paymentNew, {
      ...payment.serialize(),
      fee: 20,
      hidden: 1,
    });
  });

  test('create', async () => {
    const year = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.make();

    let paymentCreated;
    await transactLocalized(async (trx) => {
      paymentCreated = await paymentService.createTrx(
        trx,
        {
          ...payment.serialize(),
          extra: 'data',
        } as Partial<Payment>,
        { user: { id: 'a' } } as AuthContract
      );
    });

    expect(await getCount(Payment)).to.equal(1);
    const paymentNew = (await Payment.firstOrFail())?.serialize() as Record<
      string,
      any
    >;
    expect(paymentCreated.id).to.equal(paymentNew.id);
    delete paymentNew.id;

    expectExceptTimestamp(paymentNew, {
      ...payment.serialize(),
      user_id: 'a',
      hidden: 0,
      attachment: 1,
      academic_year_id: year.id,
    });
  });
});
