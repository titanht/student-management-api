import test from 'japa';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import RegistrationService, {
  RegistrationData,
} from 'app/modules/finance/payment/registration/registrationService';
import { getCount } from 'app/services/utils';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { PaymentFactory } from '../paymentFactory';
import Registration from 'app/modules/finance/payment/registration/registration';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { RegistrationFactory } from './registrationFactory';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';

const regService = new RegistrationService();

transact('RegistrationService', () => {
  test('stage', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const fee = await RegistrationFactory.make();

    await regService.stage({ ...payment, ...fee } as RegistrationData);

    expect(await getCount(StagePayment)).to.equal(1);
    expect((await StagePayment.firstOrFail()).type).to.equal(
      PaymentType.Registration
    );
  });

  test('update', async () => {
    const payment = await PaymentFactory.create();
    const fee = await RegistrationFactory.merge({
      payment_id: payment.id,
    }).create();

    await regService.update(fee.id, {
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

    const feeNew = (await regService.create(
      {
        ...payment.serialize(),
      },
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete feeNew.id;

    expect(await getCount(Payment)).to.equal(1);
    expect(await getCount(Registration)).to.equal(1);
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(feeNew, {
      ...payment.serialize(),
      hidden: false,
      payment_id: paymentNew.id,
      user_id: 'uid',
      academic_year_id: ay.id,
      payment_type: PaymentType.Registration,
    });
  });
});
