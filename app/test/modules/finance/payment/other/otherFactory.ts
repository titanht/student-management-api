import Factory from '@ioc:Adonis/Lucid/Factory';
import Other from 'app/modules/finance/payment/other/other';
import { PaymentFactory } from '../paymentFactory';

export const OtherFactory = Factory.define(Other, ({ faker }) => {
  return {
    reason: faker.lorem.sentence(),
    payment_id: faker.lorem.sentence(),
  };
})
  .relation('payment', () => PaymentFactory)
  .build();
