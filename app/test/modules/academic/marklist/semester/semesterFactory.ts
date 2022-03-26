import Factory from '@ioc:Adonis/Lucid/Factory';
import Semester from 'app/modules/academic/marklist/semester/semester';

export const SemesterFactory = Factory.define(Semester, ({ faker }) => {
  return {
    semester: faker.datatype.number({ min: 1, max: 10000 }),
  };
}).build();
