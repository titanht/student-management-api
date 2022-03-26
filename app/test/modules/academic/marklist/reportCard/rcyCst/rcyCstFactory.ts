import Factory from '@ioc:Adonis/Lucid/Factory';
import RcyCst from 'app/modules/academic/marklist/reportCard/rcyCst/rcyCst';

export const RcyCstFactory = Factory.define(RcyCst, ({ faker }) => {
  return {
    cst_id: faker.lorem.sentence(),
    rcy_id: faker.lorem.sentence(),
  };
}).build();
