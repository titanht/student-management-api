import Rcq from 'app/modules/academic/marklist/reportCard/rcq/rcq';
import RcqService from 'app/modules/academic/marklist/reportCard/rcq/rcqService';
import RcqCst from 'app/modules/academic/marklist/reportCard/rcqCst/rcqCst';
import { getCount } from 'app/services/utils';
import { transact } from 'app/test/testUtils';
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
import { RcqFactory } from './rcqFactory';

const rcqService = new RcqService();

transact('generateReport', () => {
  test('updateRank', async () => {
    await QuarterFactory.merge({ id: 'q1', semester_id: 'sm1' }).create();
    await GradeFactory.merge({ id: 'g1' }).create();
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcqFactory.merge({
      grade_student_id: gs.id,
      quarter_id: 'q1',
      rank: null,
    }).create();

    await rcqService.updateRank('g1', 'q1');

    const rc = await Rcq.findOrFail(rcF.id);
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

    await rcqService.generateReport(gs.id, quarter.id);

    expect(await getCount(Rcq)).to.equal(0);
    expect(await getCount(RcqCst)).to.equal(0);
  });

  // TODO: Retest
  // test('generates', async () => {
  //   await generateMarkData();
  //   const gsId = 'gs1';
  //   const qId = 'q1';
  //   await rcqService.generateReport(gsId, qId);

  //   expect(await getCount(RcqCst)).to.equal(2);
  //   expect(await getCount(Rcq)).to.equal(1);
  //   const rcq = (await Rcq.firstOrFail()).serialize();
  //   expect(parseInt(rcq.average)).to.equal(63);
  //   delete rcq.id;
  //   delete rcq.average;
  //   expectExceptTimestamp(rcq, {
  //     grade_student_id: gsId,
  //     quarter_id: qId,
  //     subject_count: 2,
  //     total_score: 127,
  //     rank: null,
  //     finalize_date: null,
  //     finalized: 0,
  //   });
  // });

  test('generates class report', async () => {
    await generateMarkData({ markYearActive: true });

    const gId = 'g1';
    const qId = 'q1';

    await rcqService.generateGradeReport(gId, qId);

    expect(await getCount(RcqCst)).to.equal(3);
    expect(await getCount(Rcq)).to.equal(2);
  });
});

test.group('extractCsts', () => {
  test('returns empty', () => {
    let csts = rcqService.extractCstScore([]);
    expect(csts).to.deep.equal([]);
    csts = rcqService.extractCstScore([{ id: 'cst', evaluationMethods: [] }]);
    expect(csts).to.deep.equal([{ id: 'cst', score: 0 }]);
  });

  test('returns cst ids', () => {
    const csts = rcqService.extractCstScore(quarterCstSmlData);
    expect(csts).to.deep.equal([
      { id: 'cst1', score: 37 },
      { id: 'cst2', score: 90 },
    ]);
  });
});
