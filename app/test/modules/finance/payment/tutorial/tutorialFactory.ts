import Factory from '@ioc:Adonis/Lucid/Factory';
import { Months } from 'app/modules/finance/payment/payment';
import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
import { getRandomItem } from 'app/test/testUtils';
import { PaymentFactory } from '../paymentFactory';

export const TutorialFactory = Factory.define(Tutorial, ({ faker }) => {
  return {
    month: getRandomItem(Object.values(Months)),
    payment_id: faker.lorem.sentence(),
  };
})
  .relation('payment', () => PaymentFactory)
  .build();
