import { v4 } from 'uuid';
import Factory from '@ioc:Adonis/Lucid/Factory';
import Cst from 'app/modules/academic/marklist/cst/cst';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import { GradeFactory } from '../../grade/gradeFactory';
import { TeacherFactory } from '../../teacher/teacherFactory';
import { SubjectFactory } from '../subject/subjectFactory';

export const CstFactory = Factory.define(Cst, ({ faker }) => {
  return {
    count: faker.datatype.number({ min: 1, max: 10000 }),
    grade_id: v4(),
    subject_id: v4(),
    teacher_id: v4(),
    academic_year_id: v4(),
  };
})
  .relation('grade', () => GradeFactory)
  .relation('subject', () => SubjectFactory)
  .relation('teacher', () => TeacherFactory.with('user'))
  .relation('academicYear', () => AcademicYearFactory)
  .build();
