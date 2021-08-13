import Grade from 'app/modules/academic/grade/grade';
import HrtRepo from 'app/modules/academic/homeRoom/hrt/hrtRepo';
import Student from 'app/modules/academic/student/student';
import { UserFactory } from 'app/test/modules/auth/userFactory';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import { GradeFactory } from '../../grade/gradeFactory';
import { GradeStudentFactory } from '../../gradeStudent/gradeStudentFactory';
import { StudentFactory } from '../../student/studentFactory';
import { HrtFactory } from './hrtFactory';

const hrtRepo = new HrtRepo();

transact('fetchGrade', () => {
  test('throws not found if not assigned', async () => {
    let validated = false;

    try {
      await hrtRepo.fetchGrade('id');
    } catch (err) {
      expect(err.message).to.equal('E_ROW_NOT_FOUND: Row not found');
      validated = true;
    }

    expect(validated).to.be.true;
  });

  test('fetches grade with current students', async () => {
    const user = await UserFactory.create();
    const st1 = await StudentFactory.merge({ first_name: 'zain' }).create();
    const st2 = await StudentFactory.merge({ first_name: 'aaron' }).create();
    const st3 = await StudentFactory.create();
    const gr = await GradeFactory.create();
    const gr2 = await GradeFactory.create();
    const ay1 = await AcademicYearFactory.merge({ active: true }).create();
    const ay2 = await AcademicYearFactory.merge({ active: false }).create();
    await GradeStudentFactory.merge({
      grade_id: gr.id,
      student_id: st1.id,
      academic_year_id: ay1.id,
    }).create();
    await GradeStudentFactory.merge({
      grade_id: gr.id,
      student_id: st2.id,
      academic_year_id: ay1.id,
    }).create();
    await GradeStudentFactory.merge({
      grade_id: gr2.id,
      student_id: st3.id,
      academic_year_id: ay1.id,
    }).create();
    await GradeStudentFactory.merge({
      grade_id: gr.id,
      academic_year_id: ay2.id,
      student_id: st3.id,
    }).create();
    await HrtFactory.merge({ user_id: user.id, grade_id: gr.id }).create();

    const stud1 = (await Student.findOrFail(st1.id)).serialize();
    const stud2 = (await Student.findOrFail(st2.id)).serialize();
    const grade = (await Grade.findOrFail(gr.id)).serialize();

    const assignedGrade = await hrtRepo.fetchGrade(user.id);
    expect(assignedGrade).to.deep.equal({
      ...grade,
      students: [stud2, stud1],
    });
  });
});
