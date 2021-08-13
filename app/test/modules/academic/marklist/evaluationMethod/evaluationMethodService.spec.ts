import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import EvaluationMethodService from 'app/modules/academic/marklist/evaluationMethod/evaluationMethodService';
import { getCount } from 'app/services/utils';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { EvaluationMethodFactory } from './evaluationMethodFactory';

const service = new EvaluationMethodService();

transact('create', () => {
  test('creates multi evaluations', async () => {
    await EvaluationMethodFactory.make();
    await service.create({
      evaluation_type_ids: ['a', 'b'],
      quarter_id: 'qid',
      cst_id: 'cst',
    } as any as EvaluationMethod);
    expect(await getCount(EvaluationMethod)).to.equal(2);
  });
});
