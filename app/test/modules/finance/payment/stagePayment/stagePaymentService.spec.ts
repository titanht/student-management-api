import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Fee from 'app/modules/finance/payment/fee/fee';
import Other from 'app/modules/finance/payment/other/other';
import { PaymentType } from 'app/modules/finance/payment/payment';
import Registration from 'app/modules/finance/payment/registration/registration';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import StagePaymentService from 'app/modules/finance/payment/stagePayment/stagePaymentService';
import Summer from 'app/modules/finance/payment/summer/summer';
import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
import { getCount } from 'app/services/utils';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { FeeFactory } from '../fee/feeFactory';
import { OtherFactory } from '../other/otherFactory';
import { PaymentFactory } from '../paymentFactory';
import { RegistrationFactory } from '../registration/registrationFactory';
import { SummerFactory } from '../summer/summerFactory';
import { TutorialFactory } from '../tutorial/tutorialFactory';
import { StagePaymentFactory } from './stagePaymentFactory';

const stageService = new StagePaymentService();

export const genFee = async (yearId: string) => {
  const payment = await PaymentFactory.merge({
    academic_year_id: yearId,
  }).make();
  const fee = await FeeFactory.merge({ payment_id: payment.id }).make();
  const data = { ...payment.serialize(), ...fee.serialize() };
  await StagePaymentFactory.merge({
    data: JSON.stringify(data),
    type: PaymentType.Fee,
  }).create();

  return data;
};

const genTutorial = async (yearId: string) => {
  const payment = await PaymentFactory.merge({
    academic_year_id: yearId,
    payment_type: PaymentType.Tutorial,
  }).make();
  const fee = await TutorialFactory.merge({ payment_id: payment.id }).make();
  const data = { ...payment.serialize(), ...fee.serialize() };
  await StagePaymentFactory.merge({
    data: JSON.stringify(data),
    type: PaymentType.Tutorial,
  }).create();

  return data;
};

const genSummer = async (yearId: string) => {
  const payment = await PaymentFactory.merge({
    academic_year_id: yearId,
    payment_type: PaymentType.Summer,
  }).make();
  const fee = await SummerFactory.merge({ payment_id: payment.id }).make();
  const data = { ...payment.serialize(), ...fee.serialize() };
  await StagePaymentFactory.merge({
    data: JSON.stringify(data),
    type: PaymentType.Summer,
  }).create();

  return data;
};

const genRegistration = async (yearId: string) => {
  const payment = await PaymentFactory.merge({
    academic_year_id: yearId,
    payment_type: PaymentType.Registration,
  }).make();
  const fee = await RegistrationFactory.merge({
    payment_id: payment.id,
  }).make();
  const data = { ...payment.serialize(), ...fee.serialize() };
  await StagePaymentFactory.merge({
    data: JSON.stringify(data),
    type: PaymentType.Registration,
  }).create();

  return data;
};

const genOther = async (yearId: string) => {
  const payment = await PaymentFactory.merge({
    academic_year_id: yearId,
    payment_type: PaymentType.Other,
  }).make();
  const fee = await OtherFactory.merge({
    payment_id: payment.id,
  }).make();
  const data = { ...payment.serialize(), ...fee.serialize() };
  await StagePaymentFactory.merge({
    data: JSON.stringify(data),
    type: PaymentType.Other,
  }).create();

  return data;
};

transact('StageService.commit', () => {
  test('commits all types', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const feeData = await genFee(ay.id);
    await genTutorial(ay.id);
    await genSummer(ay.id);
    await genRegistration(ay.id);
    await genOther(ay.id);

    const data = await stageService.commit({
      user: { id: 'uid' },
    } as AuthContract);

    const { payment: feeFirstPayment, ...feeFirst } = (
      await Fee.query().preload('payment').firstOrFail()
    ).serialize();
    const { payment: tutorialFirstPayment, ...tutorialFirst } = (
      await Tutorial.query().preload('payment').firstOrFail()
    ).serialize();
    data;
    const { payment: summerFirstPayment, ...summerFirst } = (
      await Summer.query().preload('payment').firstOrFail()
    ).serialize();
    const { payment: registrationFirstPayment, ...registrationFirst } = (
      await Registration.query().preload('payment').firstOrFail()
    ).serialize();
    const { payment: otherFirstPayment, ...otherFirst } = (
      await Other.query().preload('payment').firstOrFail()
    ).serialize();

    expectExceptTimestamp(
      { ...data.payment.fee[0], hidden: 0 },
      { ...feeFirstPayment, ...feeFirst }
    );
    expectExceptTimestamp(
      { ...data.payment.tutorial[0], hidden: 0 },
      { ...tutorialFirstPayment, ...tutorialFirst }
    );
    expectExceptTimestamp(
      { ...data.payment.summer[0], hidden: 0 },
      { ...summerFirstPayment, ...summerFirst }
    );
    expectExceptTimestamp(
      { ...data.payment.registration[0], hidden: 0 },
      { ...registrationFirstPayment, ...registrationFirst }
    );
    expectExceptTimestamp(
      { ...data.payment.other[0], hidden: 0 },
      { ...otherFirstPayment, ...otherFirst }
    );
    // console.log(data.payment);

    // console.log(feeData);
    // console.log(data);
    expect(data.attachment).to.equal(feeData.attachment);
    expect(data.fs).to.equal(feeData.fs);
  });

  test('returns empty', async () => {
    await PaymentFactory.create();
    await AcademicYearFactory.merge({ active: true }).create();
    const data = await stageService.commit({
      user: { id: 'uid' },
    } as AuthContract);
    delete (data as any).attachment;
    expect(data).to.deep.equal({
      payment: {
        fee: [],
        other: [],
        registration: [],
        tutorial: [],
        summer: [],
      },
      fs: '',
      total: 0,
    });
  });
});

transact('StageService', () => {
  test('getFs', async () => {
    const payment = await PaymentFactory.create();
    await StagePayment.create({
      data: JSON.stringify(payment),
      type: PaymentType.Fee,
    });

    const fs = await stageService.getFs();

    expect(fs).to.equal(payment.fs);
  });

  test('isPending returns true', async () => {
    await StagePaymentFactory.create();

    expect(await stageService.isPending()).to.be.true;
  });

  test('isPending returns false', async () => {
    expect(await stageService.isPending()).to.be.false;
  });

  test('isPendingType returns true', async () => {
    await StagePaymentFactory.merge({
      type: PaymentType.Registration,
    }).create();

    expect(await stageService.isPendingType(PaymentType.Registration)).to.be
      .true;
  });

  test('isPendingType returns false', async () => {
    await StagePaymentFactory.merge({ type: PaymentType.Fee }).create();
    expect(await stageService.isPendingType(PaymentType.Registration)).to.be
      .false;
  });

  test('removeAll', async () => {
    await StagePaymentFactory.merge({ type: PaymentType.Fee }).create();
    await StagePaymentFactory.merge({}).create();

    await stageService.removeAll();

    expect(await getCount(StagePayment)).to.equal(0);
  });

  test('stage', async () => {
    const payment = await PaymentFactory.create();

    const stage = await stageService.stage(payment, PaymentType.Fee);

    expect(await getCount(StagePayment)).to.equal(1);

    const stageNew = await StagePayment.firstOrFail();
    expect(stage.id).to.equal(stageNew.id);
  });
});
