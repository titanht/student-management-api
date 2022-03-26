import Factory from '@ioc:Adonis/Lucid/Factory';
import Fee from 'app/modules/finance/payment/fee/fee';
import { Months } from 'app/modules/finance/payment/payment';
import { getRandomItem } from 'app/test/testUtils';
import { PaymentFactory } from '../paymentFactory';

export const FeeFactory = Factory.define(Fee, ({ faker }) => {
  return {
    month: getRandomItem(Object.values(Months)),
    payment_id: faker.lorem.sentence(),
    penalty: faker.datatype.number({ min: 1000, max: 3000 }),
    scholarship: faker.datatype.number({ min: 1000, max: 3000 }),
  };
})
  .relation('payment', () => PaymentFactory)
  .build();
