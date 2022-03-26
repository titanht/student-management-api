import Factory from '@ioc:Adonis/Lucid/Factory';
import RcqCst from 'app/modules/academic/marklist/reportCard/rcqCst/rcqCst';

export const RcqCstFactory = Factory.define(RcqCst, ({ faker }) => {
  return {
    cst_id: faker.lorem.sentence(),
    rcq_id: faker.lorem.sentence(),
  };
}).build();
