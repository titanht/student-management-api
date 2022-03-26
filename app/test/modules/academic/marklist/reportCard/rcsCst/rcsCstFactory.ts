import Factory from '@ioc:Adonis/Lucid/Factory';
import RcsCst from 'app/modules/academic/marklist/reportCard/rcsCst/rcsCst';

export const RcsCstFactory = Factory.define(RcsCst, ({ faker }) => {
  return {
    cst_id: faker.lorem.sentence(),
    rcs_id: faker.lorem.sentence(),
  };
}).build();
