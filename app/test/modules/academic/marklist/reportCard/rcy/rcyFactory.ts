import Factory from '@ioc:Adonis/Lucid/Factory';
import Rcy from 'app/modules/academic/marklist/reportCard/rcy/rcy';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';

export const RcyFactory = Factory.define(Rcy, ({ faker }) => {
  return {
    academic_year_id: faker.lorem.sentence(),
    grade_student_id: faker.lorem.sentence(),
    total_score: faker.datatype.number({ min: 1, max: 10000 }),
    average: faker.datatype.number({ min: 1, max: 10000 }),
    subject_count: faker.datatype.number({ min: 1, max: 10000 }),
    rank: faker.datatype.number({ min: 1, max: 10000 }),
    finalized: faker.datatype.boolean(),
    // finalize_date: null,
  };
})
  .relation('academicYear', () => AcademicYearFactory)
  .relation('gradeStudent', () => GradeStudentFactory)
  .build();
