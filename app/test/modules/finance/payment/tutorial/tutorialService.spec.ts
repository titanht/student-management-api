import test from 'japa';
import TutorialService, {
  TutorialData,
} from 'app/modules/finance/payment/tutorial/tutorialService';
import { PaymentFactory } from '../paymentFactory';
import { TutorialFactory } from './tutorialFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';
import Payment, {
  Months,
  PaymentType,
} from 'app/modules/finance/payment/payment';
import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';

const tutorialService = new TutorialService();

transact('TutorialService', () => {
  test('stage', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const fee = await TutorialFactory.make();

    await tutorialService.stage({ ...payment, ...fee } as TutorialData);

    expect(await getCount(StagePayment)).to.equal(1);
    expect((await StagePayment.firstOrFail()).type).to.equal(
      PaymentType.Tutorial
    );
  });

  test('update', async () => {
    const payment = await PaymentFactory.create();
    const fee = await TutorialFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    await tutorialService.update(fee.id, {
      cash: 40,
      month: Months.Tikimt,
    });

    const paymentUpdated = await Payment.findOrFail(payment.id);
    const tutUpdated = await Tutorial.findOrFail(fee.id);

    expect(paymentUpdated.cash).to.equal(40);
    expect(tutUpdated.month).to.equal(Months.Tikimt);
  });

  test('create', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).make();
    const tutorial = await TutorialFactory.make();

    // console.log(tutorial.serialize());

    const tutorialNew = (await tutorialService.create(
      {
        ...payment.serialize(),
        ...tutorial.serialize(),
      },
      { user: { id: 'uid' } } as AuthContract
    )) as Record<string, any>;
    delete tutorialNew.id;

    expect(await getCount(Payment)).to.equal(1, 'Payment count');
    expect(await getCount(Tutorial)).to.equal(1, 'Tutorial count');
    const paymentNew = await Payment.firstOrFail();

    expectExceptTimestamp(tutorialNew, {
      ...payment.serialize(),
      hidden: false,
      ...tutorial.serialize(),
      payment_id: paymentNew.id,
      user_id: 'uid',
      academic_year_id: ay.id,
      payment_type: PaymentType.Tutorial,
    });
  });
});
