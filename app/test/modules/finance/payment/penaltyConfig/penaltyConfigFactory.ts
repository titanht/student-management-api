import Factory from '@ioc:Adonis/Lucid/Factory';
import PenaltyConfig from 'app/modules/finance/payment/penaltyConfig/penaltyConfig';

export const PenaltyConfigFactory = Factory.define(
  PenaltyConfig,
  ({ faker }) => {
    return {
      deadline_days: faker.datatype.number({ min: 1, max: 10000 }),
      fixed_penalty_days: faker.datatype.number({ min: 1, max: 10000 }),
      fixed_penalty_fee: faker.datatype.number({ min: 1, max: 10000 }),
      incrementing_penalty_fee: faker.datatype.number({ min: 1, max: 10000 }),
      incrementing_penalty_days: faker.datatype.number({ min: 1, max: 10000 }),
    };
  }
).build();
