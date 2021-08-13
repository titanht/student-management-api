import Cst from 'app/modules/academic/marklist/cst/cst';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import Rcs from 'app/modules/academic/marklist/reportCard/rcs/rcs';
import RcsRepo from 'app/modules/academic/marklist/reportCard/rcs/rcsRepo';
import Sml from 'app/modules/academic/marklist/sml/sml';
import { getOne } from 'app/services/utils';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { generateMarkData } from '../../../_data/mark';
import { RcsFactory } from './rcsFactory';

const factory = RcsFactory;
const rcsRepo = new RcsRepo();

transact('RcsRepo', () => {
  test('fetchGradeSemesterCards', async () => {
    const gs1 = await GradeStudentFactory.merge({
      grade_id: 'g1',
      academic_year_id: 'ay1',
      student_id: 'st1',
    }).create();
    const gs2 = await GradeStudentFactory.merge({
      grade_id: 'g2',
      academic_year_id: 'ay1',
      student_id: 'st2',
    }).create();
    const gs3 = await GradeStudentFactory.merge({
      grade_id: 'g1',
      academic_year_id: 'ay2',
      student_id: 'st1',
    }).create();

    await factory
      .merge([
        { id: 'rc1', semester_id: 'sem1', grade_student_id: gs1.id },
        { id: 'rc2', semester_id: 'sem2', grade_student_id: gs1.id },
        { id: 'rc3', semester_id: 'sem1', grade_student_id: gs2.id },
        { id: 'rc4', semester_id: 'sem1', grade_student_id: gs3.id },
      ])
      .createMany(4);

    const rc = await getOne(Rcs, 'rc1');
    const cards = await rcsRepo.fetchGradeSemesterCards('g1', 'sem1', 'ay1');
    expect(cards).to.deep.equal([rc]);
  });

  test('updateRank', async () => {
    const r1F = await factory.merge({ average: 90, rank: null }).create();
    const r2F = await factory.merge({ average: 98, rank: null }).create();

    await rcsRepo.updateRank([r1F, r2F], { [r1F.id]: 2, [r2F.id]: 1 });

    const r1 = await Rcs.findOrFail(r1F.id);
    const r2 = await Rcs.findOrFail(r2F.id);

    expect(r1.rank).to.equal(2);
    expect(r2.rank).to.equal(1);
  });

  test('getQuarterSml', async () => {
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
    const sml1 = await getOne(Sml, 'sml1');
    // const sml2 = await getOne(Sml, 'sml2');
    const sml3 = await getOne(Sml, 'sml3');
    const sml4 = await getOne(Sml, 'sml4');
    const sml6 = await getOne(Sml, 'sml6');
    const sml8 = await getOne(Sml, 'sml8');

    const gsId = 'gs1';
    const sId = 'sem1';

    const smlData = await rcsRepo.getSemesterSml(gsId, sId);
    // // console.log((await Subject.all()).map((s) => s.serialize()));
    // // console.log(JSON.stringify(smlData, null, 2));
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
        evaluationMethods: [],
      },
    ]);
  });
});
