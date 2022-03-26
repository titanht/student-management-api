import Factory from '@ioc:Adonis/Lucid/Factory';
import { PaymentType } from 'app/modules/finance/payment/payment';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import { getRandomItem } from 'app/test/testUtils';

export const StagePaymentFactory = Factory.define(StagePayment, ({ faker }) => {
  return {
    data: faker.lorem.sentence(),
    type: getRandomItem(Object.values(PaymentType)),
  };
}).build();
