import Factory from '@ioc:Adonis/Lucid/Factory';
import Grade from 'app/modules/academic/grade/grade';

export const GradeFactory = Factory.define(Grade, ({ faker }) => {
  return {
    name: faker.lorem.sentence(),
    monthly_fee: faker.datatype.number({ min: 1000, max: 3000 }),
    registration_fee: faker.datatype.number({ min: 1, max: 10000 }),
    tutorial_fee: faker.datatype.number({ min: 1, max: 10000 }),
    summer_fee: faker.datatype.number({ min: 1, max: 10000 }),
  };
}).build();
