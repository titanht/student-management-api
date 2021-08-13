import { v4 } from 'uuid';
import Factory from '@ioc:Adonis/Lucid/Factory';
import Quarter from 'app/modules/academic/marklist/quarter/quarter';
import { SemesterFactory } from '../semester/semesterFactory';

export const QuarterFactory = Factory.define(Quarter, ({ faker }) => {
  return {
    quarter: faker.datatype.number({ min: 1, max: 10000 }),
    semester_id: v4(),
  };
})
  .relation('semester', () => SemesterFactory)
  .build();
