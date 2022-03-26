import Factory from '@ioc:Adonis/Lucid/Factory';
import EvaluationType from 'app/modules/academic/marklist/evaluationType/evaluationType';

export const EvaluationTypeFactory = Factory.define(
  EvaluationType,
  ({ faker }) => {
    return {
      name: faker.lorem.sentence(),
      weight: faker.datatype.number({ min: 1, max: 10000 }),
    };
  }
).build();
