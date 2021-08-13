import test from 'japa';
import GradeStudentRepo from 'app/modules/academic/gradeStudent/gradeStudentRepo';
import { transact } from 'app/test/testUtils';
import { GradeStudentFactory } from './gradeStudentFactory';
import { AcademicYearFactory } from '../academicYear/academicFactory';
import { expect } from 'chai';
import { StudentFactory } from '../student/studentFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { getCount, getQueryCount } from 'app/services/utils';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';

const gsRepo = new GradeStudentRepo();
const factory = GradeStudentFactory;

transact('GSRepo.promote', () => {
  test('creates new grade', async () => {
    const students = (await StudentFactory.createMany(2)).map(
      (item) => item.id
    );
    const gradeId = (await GradeFactory.create()).id;
    const ay = await AcademicYearFactory.create();

    await gsRepo.promoteGrade(students, gradeId, ay.id);
    await gsRepo.promoteGrade(students, gradeId, ay.id);

    expect(await getCount(GradeStudent)).to.equal(2);
    const gsCount = await getQueryCount(
      GradeStudent.query()
        .where('grade_id', gradeId)
        .where('academic_year_id', ay.id)
    );
    expect(gsCount).to.equal(2);
  });

  test('creates new grade preserving previous', async () => {
    const ay0 = await AcademicYearFactory.create();
    const students = (
      await GradeStudentFactory.with('student')
        .merge({ academic_year_id: ay0.id })
        .createMany(2)
    ).map((item) => item.student_id);

    const gradeId = (await GradeFactory.create()).id;
    const ay = await AcademicYearFactory.create();

    await gsRepo.promoteGrade(students, gradeId, ay.id);
    await gsRepo.promoteGrade(students, gradeId, ay.id);

    expect(await getCount(GradeStudent)).to.equal(4);
    const gsCount = await getQueryCount(
      GradeStudent.query()
        .where('grade_id', gradeId)
        .where('academic_year_id', ay.id)
    );
    expect(gsCount).to.equal(2);
  });
});

transact('GsRepo.fetchGradeStudents', () => {
  test(' fetches gsIds', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const gs1 = await factory.merge({ academic_year_id: ay.id }).create();
    await factory.merge({ grade_id: gs1.grade_id }).create();
    await factory.merge({ academic_year_id: gs1.academic_year_id }).create();
    await factory.merge({ student_id: gs1.student_id });

    const gsIds = await gsRepo.fetchGradeStudents(gs1.grade_id);

    expect(gsIds).to.deep.equal([gs1.id]);
  });
});
