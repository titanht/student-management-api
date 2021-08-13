import test from 'japa';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import { testError, transact } from 'app/test/testUtils';
import { GradeStudentFactory } from './gradeStudentFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { getOne } from 'app/services/utils';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import { expect } from 'chai';

const gsService = new GradeStudentService();

transact('changeGrade', () => {
  test('throws error', async () => {
    await testError(
      () => gsService.changeGrade('id', 'g-id'),
      'E_ROW_NOT_FOUND: Row not found'
    );
  });

  test('updates grade_id', async () => {
    const gs = await GradeStudentFactory.create();
    const gradeId = (await GradeFactory.create()).id;

    await gsService.changeGrade(gs.id, gradeId);

    const updateGs = (await getOne(GradeStudent, gs.id)) as GradeStudent;
    expect(updateGs.grade_id).to.equal(gradeId);
  });
});
