import test from 'japa';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import SummerService, {
  SummerData,
} from 'app/modules/finance/payment/summer/summerService';
import { getCount } from 'app/services/utils';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { PaymentFactory } from '../paymentFactory';
import Summer from 'app/modules/finance/payment/summer/summer';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { SummerFactory } from './summerFactory';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';

const summerService = new SummerService();

transact('SummerService', () => {
  test('stage', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const fee = await SummerFactory.make();

    await summerService.stage({ ...payment, ...fee } as SummerData);

    expect(await getCount(StagePayment)).to.equal(1);
    expect((await StagePayment.firstOrFail()).type).to.equal(
      PaymentType.Summer
    );
  });

  test('update', async () => {
    const payment = await PaymentFactory.create();
    const fee = await SummerFactory.merge({
      payment_id: payment.id,
    }).create();

    await summerService.update(fee.id, {
      cash: 40,
    });

    const paymentUpdated = await Payment.findOrFail(payment.id);

    expect(paymentUpdated.cash).to.equal(40);
  });

  test('create', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();

    const feeNew = (await summerService.create(
      {
        ...payment.serialize(),
      },
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete feeNew.id;

    expect(await getCount(Payment)).to.equal(1);
    expect(await getCount(Summer)).to.equal(1);
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(feeNew, {
      ...payment.serialize(),
      hidden: false,
      payment_id: paymentNew.id,
      user_id: 'uid',
      academic_year_id: ay.id,
      payment_type: PaymentType.Summer,
    });
  });
});
