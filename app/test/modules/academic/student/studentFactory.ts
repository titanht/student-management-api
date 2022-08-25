import Factory from '@ioc:Adonis/Lucid/Factory';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Grade from 'app/modules/academic/grade/grade';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Student from 'app/modules/academic/student/student';
import { Gender } from 'app/modules/_shared/types';
import { getRandomItem } from 'app/test/testUtils';
import { DateTime } from 'luxon';
import { AcademicYearFactory } from '../academicYear/academicFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { GradeStudentFactory } from '../gradeStudent/gradeStudentFactory';

export const StudentFactory = Factory.define(Student, ({ faker }) => {
  return {
    first_name: faker.lorem.sentence(),
    father_name: faker.lorem.sentence(),
    gender: getRandomItem(Object.values(Gender)),
    grand_father_name: faker.lorem.sentence(),
    id_number: faker.lorem.sentence(),
    primary_phone: faker.lorem.sentence(),
    img: faker.lorem.sentence(),
    scholarship_amount: faker.datatype.number({ min: 1, max: 10000 }),
    date_of_birth: '2000-01-01' as unknown as DateTime,
  };
})
  .merge(async (model, attrs, _ctx) => {
    model.merge(attrs);
  })
  .build();

export const generateStudents = async () => {
  const ay1 = await AcademicYearFactory.merge({
    active: true,
    year: 2012,
  }).create();
  const ay2 = await AcademicYearFactory.merge({
    active: false,
    year: 2011,
  }).create();

  const g1 = await GradeFactory.create();
  const g2 = await GradeFactory.create();

  const s1 = await StudentFactory.merge({ first_name: 'a' }).create();
  const s2 = await StudentFactory.merge({ first_name: 'b' }).create();
  const s3 = await StudentFactory.merge({ first_name: 'c' }).create();

  const s4 = await StudentFactory.merge({ first_name: 'd' }).create();
  const s5 = await StudentFactory.merge({ first_name: 'e' }).create();
  const s6 = await StudentFactory.merge({ first_name: 'f' }).create();

  // Grade 1 students
  // Cur year
  const gs1_1 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s1.id,
    grade_id: g1.id,
  }).create();
  const gs2_1 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s2.id,
    grade_id: g1.id,
  }).create();
  const gs3_1 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s3.id,
    grade_id: g1.id,
  }).create();
  // Last year
  const gs4_1 = await GradeStudentFactory.merge({
    academic_year_id: ay2.id,
    student_id: s4.id,
    grade_id: g1.id,
  }).create();
  const gs5_1 = await GradeStudentFactory.merge({
    academic_year_id: ay2.id,
    student_id: s5.id,
    grade_id: g1.id,
  }).create();
  const gs6_1 = await GradeStudentFactory.merge({
    academic_year_id: ay2.id,
    student_id: s6.id,
    grade_id: g1.id,
  }).create();

  // Grade 2 Students
  const gs4_2 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s4.id,
    grade_id: g2.id,
  }).create();
  const gs5_2 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s5.id,
    grade_id: g2.id,
  }).create();
  const gs6_2 = await GradeStudentFactory.merge({
    academic_year_id: ay1.id,
    student_id: s6.id,
    grade_id: g2.id,
  }).create();

  return {
    ay1: (await AcademicYear.findOrFail(ay1.id)).serialize() as AcademicYear,
    ay2: (await AcademicYear.findOrFail(ay2.id)).serialize() as AcademicYear,
    g1: (await Grade.findOrFail(g1.id)).serialize() as Grade,
    g2: (await Grade.findOrFail(g2.id)).serialize() as Grade,
    s1: (await Student.findOrFail(s1.id)).serialize() as Student,
    s2: (await Student.findOrFail(s2.id)).serialize() as Student,
    s3: (await Student.findOrFail(s3.id)).serialize() as Student,
    s4: (await Student.findOrFail(s4.id)).serialize() as Student,
    s5: (await Student.findOrFail(s5.id)).serialize() as Student,
    s6: (await Student.findOrFail(s6.id)).serialize() as Student,
    gs1_1: (
      await GradeStudent.findOrFail(gs1_1.id)
    ).serialize() as GradeStudent,
    gs2_1: (
      await GradeStudent.findOrFail(gs2_1.id)
    ).serialize() as GradeStudent,
    gs3_1: (
      await GradeStudent.findOrFail(gs3_1.id)
    ).serialize() as GradeStudent,
    gs4_1: (
      await GradeStudent.findOrFail(gs4_1.id)
    ).serialize() as GradeStudent,
    gs5_1: (
      await GradeStudent.findOrFail(gs5_1.id)
    ).serialize() as GradeStudent,
    gs6_1: (
      await GradeStudent.findOrFail(gs6_1.id)
    ).serialize() as GradeStudent,
    gs4_2: (
      await GradeStudent.findOrFail(gs4_2.id)
    ).serialize() as GradeStudent,
    gs5_2: (
      await GradeStudent.findOrFail(gs5_2.id)
    ).serialize() as GradeStudent,
    gs6_2: (
      await GradeStudent.findOrFail(gs6_2.id)
    ).serialize() as GradeStudent,
  };
};
