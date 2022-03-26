import { v4 } from 'uuid';
import Factory from '@ioc:Adonis/Lucid/Factory';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import { AcademicYearFactory } from '../academicYear/academicFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { StudentFactory } from '../student/studentFactory';

export const GradeStudentFactory = Factory.define(GradeStudent, ({}) => {
  return {
    grade_id: v4(),
    student_id: v4(),
    academic_year_id: v4(),
  };
})
  .relation('grade', () => GradeFactory)
  .relation('student', () => StudentFactory)
  .relation('academicYear', () => AcademicYearFactory)
  .build();
