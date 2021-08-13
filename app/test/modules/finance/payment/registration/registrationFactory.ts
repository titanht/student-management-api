import Factory from '@ioc:Adonis/Lucid/Factory';
import Registration from 'app/modules/finance/payment/registration/registration';
import { PaymentFactory } from '../paymentFactory';

export const RegistrationFactory = Factory.define(Registration, ({ faker }) => {
  return {
    payment_id: faker.lorem.sentence(),
  };
})
  .relation('payment', () => PaymentFactory)
  .build();
