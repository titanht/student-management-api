import Rcs from 'app/modules/academic/marklist/reportCard/rcs/rcs';
import RcsService from 'app/modules/academic/marklist/reportCard/rcs/rcsService';
import RcsCst from 'app/modules/academic/marklist/reportCard/rcsCst/rcsCst';
import { getCount } from 'app/services/utils';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { GradeFactory } from '../../../grade/gradeFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { generateMarkData } from '../../../_data/mark';
import { quarterCstSmlData } from '../../../_data/quarterMark';
import { CstFactory } from '../../cst/cstFactory';
import { EvaluationMethodFactory } from '../../evaluationMethod/evaluationMethodFactory';
import { QuarterFactory } from '../../quarter/quarterFactory';
import { SemesterFactory } from '../../semester/semesterFactory';
import { RcsFactory } from './rcsFactory';

const rcsService = new RcsService();

transact('RcsService', () => {
  // test.only('fetch devisor', async () => {
  //   const quarter = await QuarterFactory.with('semester').create();
  //   const gs = await GradeStudentFactory.create();

  //   await CstFactory.
  // });

  test('updateRank', async () => {
    await SemesterFactory.merge({ id: 'sem1' }).create();
    await GradeFactory.merge({ id: 'g1' }).create();
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcsFactory.merge({
      grade_student_id: gs.id,
      semester_id: 'sem1',
      rank: null,
    }).create();

    await rcsService.updateRank('g1', 'sem1');

    const rc = await Rcs.findOrFail(rcF.id);
    expect(rc.rank).to.equal(1);
  });

  test('doesnt generate for no marklist', async () => {
    const gs = await GradeStudentFactory.with('grade')
      .with('student')
      .with('academicYear')
      .create();
    const quarter = await QuarterFactory.with('semester').create();
    const cst = await CstFactory.merge({
      grade_id: gs.grade_id,
      academic_year_id: gs.academic_year_id,
    }).create();
    await EvaluationMethodFactory.merge({
      quarter_id: quarter.id,
      cst_id: cst.id,
    })
      .with('evaluationType')
      .create();

    await rcsService.generateReport(gs.id, quarter.semester_id);

    expect(await getCount(Rcs)).to.equal(0);
    expect(await getCount(RcsCst)).to.equal(0);
  });

  test('generates', async () => {
    await generateMarkData();
    const gsId = 'gs1';
    const semId = 'sem1';

    await rcsService.generateReport(gsId, semId);

    expect(await getCount(RcsCst)).to.equal(2);

    expect(await getCount(Rcs)).to.equal(1);
    const rcs = (await Rcs.firstOrFail()).serialize();
    delete rcs.id;
    expectExceptTimestamp(rcs, {
      grade_student_id: gsId,
      semester_id: semId,
      subject_count: 2,
      total_score: 156,
      average: 78,
      rank: null,
      finalize_date: null,
      finalized: 0,
    });
  });

  test('generates class', async () => {
    await generateMarkData();
    const gId = 'g1';
    const semId = 'sem1';

    await rcsService.generateGradeReport(gId, semId);

    expect(await getCount(RcsCst)).to.equal(3);
    expect(await getCount(Rcs)).to.equal(2);
  });
});

test.group('extractCsts', () => {
  test('returns empty', () => {
    let csts = rcsService.extractCstScore([]);
    expect(csts).to.deep.equal([]);
    csts = rcsService.extractCstScore([{ id: 'cst', evaluationMethods: [] }]);
    expect(csts).to.deep.equal([{ id: 'cst', score: 0 }]);
  });

  test('returns cst ids', () => {
    const csts = rcsService.extractCstScore(quarterCstSmlData);
    expect(csts).to.deep.equal([
      { id: 'cst1', score: 37 / 2 },
      { id: 'cst2', score: 90 / 2 },
    ]);
  });
});
