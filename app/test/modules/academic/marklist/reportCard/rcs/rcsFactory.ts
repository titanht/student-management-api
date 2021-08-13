import Factory from '@ioc:Adonis/Lucid/Factory';
import Rcs from 'app/modules/academic/marklist/reportCard/rcs/rcs';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { SemesterFactory } from '../../semester/semesterFactory';

export const RcsFactory = Factory.define(Rcs, ({ faker }) => {
  return {
    semester_id: faker.lorem.sentence(),
    grade_student_id: faker.lorem.sentence(),
    total_score: faker.datatype.number({ min: 1, max: 10000 }),
    average: faker.datatype.number({ min: 1, max: 10000 }),
    subject_count: faker.datatype.number({ min: 1, max: 10000 }),
    rank: faker.datatype.number({ min: 1, max: 10000 }),
    finalized: faker.datatype.number(),
    finalize_date: null,
  };
})
  .relation('semester', () => SemesterFactory)
  .relation('gradeStudent', () => GradeStudentFactory)
  .build();
