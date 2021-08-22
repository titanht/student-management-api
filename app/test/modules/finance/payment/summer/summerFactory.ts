import Factory from '@ioc:Adonis/Lucid/Factory';
import Summer from 'app/modules/finance/payment/summer/summer';
import { PaymentFactory } from '../paymentFactory';

export const SummerFactory = Factory.define(Summer, ({ faker }) => {
  return {
    payment_id: faker.lorem.sentence(),
  };
})
  .relation('payment', () => PaymentFactory)
  .build();
