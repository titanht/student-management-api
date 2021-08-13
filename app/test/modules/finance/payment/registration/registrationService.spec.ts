import test from 'japa';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Payment from 'app/modules/finance/payment/payment';
import RegistrationService from 'app/modules/finance/payment/registration/registrationService';
import { getCount } from 'app/services/utils';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { PaymentFactory } from '../paymentFactory';
import Registration from 'app/modules/finance/payment/registration/registration';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';

const regService = new RegistrationService();

transact('RegistrationService', () => {
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
      attachment: 1,
      academic_year_id: ay.id,
    });
  });
});
