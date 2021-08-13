// import Cst from 'app/modules/academic/marklist/cst/cst';
// import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
// import Rcs from 'app/modules/academic/marklist/reportCard/rcs/rcs';
// import RcsRepo from 'app/modules/academic/marklist/reportCard/rcs/rcyRepo';
// import Sml from 'app/modules/academic/marklist/sml/sml';
// import { getOne } from 'app/services/utils';
// import { transact } from 'app/test/testUtils';
// import { expect } from 'chai';
// import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
// import { generateMarkData } from '../../../_data/mark';
// import { RcsFactory } from './rcsFactory';

import test from 'japa';
import Rcy from 'app/modules/academic/marklist/reportCard/rcy/rcy';
import RcyRepo from 'app/modules/academic/marklist/reportCard/rcy/rcyRepo';
import { getOne } from 'app/services/utils';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { RcyFactory } from './rcyFactory';
import { generateMarkData } from '../../../_data/mark';
import Cst from 'app/modules/academic/marklist/cst/cst';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import Sml from 'app/modules/academic/marklist/sml/sml';

const factory = RcyFactory;
const rcyRepo = new RcyRepo();

transact('RcyRepo', () => {
  test('fetchGradeSemesterCards', async () => {
    const gs1 = await GradeStudentFactory.merge({
      grade_id: 'g1',
      academic_year_id: 'ay1',
      student_id: 'st1',
    }).create();
    const gs2 = await GradeStudentFactory.merge({
      grade_id: 'g1',
      academic_year_id: 'ay2',
      student_id: 'st2',
    }).create();
    const gs3 = await GradeStudentFactory.merge({
      grade_id: 'g2',
      academic_year_id: 'ay1',
      student_id: 'st2',
    }).create();
    await factory
      .merge([
        { id: 'rc1', academic_year_id: 'ay1', grade_student_id: gs1.id },
        { id: 'rc3', academic_year_id: 'ay2', grade_student_id: gs2.id },
        { id: 'rc4', academic_year_id: 'ay1', grade_student_id: gs3.id },
      ])
      .createMany(4);
    const rc = await getOne(Rcy, 'rc1');
    const cards = await rcyRepo.fetchGradeYearCards('g1', 'ay1');
    expect(cards).to.deep.equal([rc]);
  });

  test('updateRank', async () => {
    const r1F = await factory.merge({ average: 90, rank: null }).create();
    const r2F = await factory.merge({ average: 98, rank: null }).create();
    await rcyRepo.updateRank([r1F, r2F], { [r1F.id]: 2, [r2F.id]: 1 });
    const r1 = await Rcy.findOrFail(r1F.id);
    const r2 = await Rcy.findOrFail(r2F.id);
    expect(r1.rank).to.equal(2);
    expect(r2.rank).to.equal(1);
  });

  test('getYearSml', async () => {
    await generateMarkData();
    const cst1 = await getOne(Cst, 'cst1');
    const cst2 = await getOne(Cst, 'cst2');
    const cst6 = await getOne(Cst, 'cst6');
    const em1 = await getOne(EvaluationMethod, 'em1');
    const em2 = await getOne(EvaluationMethod, 'em2');
    const em3 = await getOne(EvaluationMethod, 'em3');
    const em4 = await getOne(EvaluationMethod, 'em4');
    const em5 = await getOne(EvaluationMethod, 'em5');
    const em6 = await getOne(EvaluationMethod, 'em6');
    const em7 = await getOne(EvaluationMethod, 'em7');
    const em9 = await getOne(EvaluationMethod, 'em9');
    const sml1 = await getOne(Sml, 'sml1');
    // const sml2 = await getOne(Sml, 'sml2');
    const sml3 = await getOne(Sml, 'sml3');
    const sml4 = await getOne(Sml, 'sml4');
    const sml6 = await getOne(Sml, 'sml6');
    const sml8 = await getOne(Sml, 'sml8');

    const gsId = 'gs1';
    const yId = 'ay1';
    const smlData = await rcyRepo.getYearSml(gsId, yId);
    // // // console.log((await Subject.all()).map((s) => s.serialize()));
    // // // console.log(JSON.stringify(smlData, null, 2));
    expect(smlData).to.deep.equal([
      {
        ...cst1,
        evaluationMethods: [
          {
            ...em1,
            smls: [sml1],
          },
          {
            ...em2,
            smls: [],
          },
          {
            ...em5,
            smls: [sml6],
          },
          {
            ...em7,
            smls: [],
          },
        ],
      },
      {
        ...cst2,
        evaluationMethods: [
          {
            ...em3,
            smls: [sml3],
          },
          {
            ...em4,
            smls: [sml4],
          },
          {
            ...em6,
            smls: [sml8],
          },
        ],
      },
      {
        ...cst6,
        evaluationMethods: [{ ...em9, smls: [] }],
      },
    ]);
  });
});
