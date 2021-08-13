import Factory from '@ioc:Adonis/Lucid/Factory';
import Rcq from 'app/modules/academic/marklist/reportCard/rcq/rcq';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { QuarterFactory } from '../../quarter/quarterFactory';

export const RcqFactory = Factory.define(Rcq, ({ faker }) => {
  return {
    quarter_id: faker.lorem.sentence(),
    grade_student_id: faker.lorem.sentence(),
    total_score: faker.datatype.number({ min: 1, max: 10000 }),
    average: faker.datatype.number({ min: 1, max: 10000 }),
    subject_count: faker.datatype.number({ min: 1, max: 10000 }),
    rank: faker.datatype.number({ min: 1, max: 10000 }),
    finalized: faker.datatype.number(),
    finalize_date: null,
  };
})
  .relation('quarter', () => QuarterFactory)
  .relation('gradeStudent', () => GradeStudentFactory)
  .build();
