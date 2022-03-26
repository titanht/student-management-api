import test from 'japa';
import RcyService from 'app/modules/academic/marklist/reportCard/rcy/rcyService';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { GradeFactory } from '../../../grade/gradeFactory';
import { AcademicYearFactory } from '../../../academicYear/academicFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { RcyFactory } from './rcyFactory';
import Rcy from 'app/modules/academic/marklist/reportCard/rcy/rcy';
import { expect } from 'chai';
import { quarterCstSmlData } from '../../../_data/quarterMark';
import { generateMarkData } from '../../../_data/mark';
import { getCount } from 'app/services/utils';
import RcyCst from 'app/modules/academic/marklist/reportCard/rcyCst/rcyCst';

const rcyService = new RcyService();

transact('RcyService', () => {
  test('updateRank', async () => {
    // await SemesterFactory.merge({ id: 'sem1' }).create();
    await GradeFactory.merge({ id: 'g1' }).create();
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const gs = await GradeStudentFactory.merge({
      grade_id: 'g1',
      student_id: 's1',
      academic_year_id: ay.id,
    }).create();
    const rcF = await RcyFactory.merge({
      grade_student_id: gs.id,
      academic_year_id: ay.id,
      rank: null,
    }).create();
    // console.log(gs.serialize(), rcF.serialize());
    await rcyService.updateRank('g1', ay.id);
    const rc = await Rcy.findOrFail(rcF.id);
    expect(rc.rank).to.equal(1);
  });

  test('generates', async () => {
    await generateMarkData();
    const gsId = 'gs1';
    const ayId = 'ay1';
    await rcyService.generateReport(gsId, ayId);
    expect(await getCount(RcyCst)).to.equal(2);
    expect(await getCount(Rcy)).to.equal(1);
    const rcy = (await Rcy.firstOrFail()).serialize();
    delete rcy.id;
    // console.log(object)
    expectExceptTimestamp(rcy, {
      grade_student_id: gsId,
      academic_year_id: ayId,
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
    const ayId = 'ay1';
    await rcyService.generateReportGrade(gId, ayId);

    expect(await getCount(RcyCst)).to.equal(3);
    expect(await getCount(Rcy)).to.equal(2);
  });

  test.group('extractCsts', () => {
    test('returns empty', () => {
      let csts = rcyService.extractCstScore([]);
      expect(csts).to.deep.equal([]);
      csts = rcyService.extractCstScore([{ id: 'cst', evaluationMethods: [] }]);
      expect(csts).to.deep.equal([{ id: 'cst', score: 0 }]);
    });
    test('returns cst ids', () => {
      const csts = rcyService.extractCstScore(quarterCstSmlData);
      expect(csts).to.deep.equal([
        { id: 'cst1', score: 37 / 4 },
        { id: 'cst2', score: 90 / 4 },
      ]);
    });
  });
});
