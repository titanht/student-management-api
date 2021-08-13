import _ from 'lodash';
import supertest from 'supertest';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import test from 'japa';
import { EvaluationMethodFactory } from './evaluationMethodFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
  generateEncoded,
} from 'app/test/testUtils/api';
import { TeacherFactory } from '../../teacher/teacherFactory';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';

const apiUrl = '/academic/marklist/evaluation-methods';
const roles = [
  'add-evaluation-method',
  'edit-evaluation-method',
  'remove-evaluation-method',
  'view-evaluation-method',
];

const factory = EvaluationMethodFactory.with('evaluationType')
  .with('quarter', 1, (q) => q.with('semester'))
  .with('cst', 1, (cst) =>
    cst
      .with('grade')
      .with('subject')
      .with('academicYear')
      .merge({ teacher_id: 't' })
  );

transact('EvaluationMethod show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationMethod,
    });
  });
});

transact('EvaluationMethod paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationMethod,
    });
  });
});

transact('EvaluationMethod index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationMethod,
    });
  });
});

transact('EvaluationMethod create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test('validate unique', async () => {
    const dataF = await factory.create();
    const data = dataF.serialize();
    data.evaluation_type_ids = [data.evaluation_type_id];

    // console.log(data);
    await validateApi(
      apiUrl,
      roles,
      {
        'evaluation_type_ids.0': 'evaluation method already added',
      },
      data
    )();
  });
  test('store', async () => {
    const dataF = await factory.create();
    const data = dataF.serialize();
    await dataF.delete();
    data.evaluation_type_ids = [data.evaluation_type_id];

    const encoded = await generateEncoded(roles);
    const teacher = await TeacherFactory.with('user').create();

    return supertest(BASE_URL)
      .post(apiUrl)
      .send({ ...data, teacher_id: teacher.id })
      .set('Authorization', `Basic ${encoded}`)
      .expect(201)
      .then(async (_res) => {
        expect(await getCount(EvaluationMethod)).to.equal(1);
        // const newData = (await model.firstOrFail()).serialize();
        // // console.log({ body: res.body, ass: { ...newData, ...assertionData } });
        // expectExceptTimestamp(res.body, { ...newData, ...assertionData });
      });
  });
  test(
    'validate',
    validateApi(apiUrl, roles, {
      evaluation_type_ids: 'required validation failed',
      quarter_id: 'required validation failed',
      cst_id: 'required validation failed',
    })
  );
});

transact('EvaluationMethod update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        evaluation_type_id: 'exists validation failure',
        quarter_id: 'exists validation failure',
        cst_id: 'exists validation failure',
      },
      { evaluation_type_id: 100, quarter_id: 100, cst_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await EvaluationMethod.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (
      await EvaluationMethod.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: EvaluationMethod,
      item,
      updateData,
      updateFields: ['evaluation_type_id', 'quarter_id', 'cst_id'],
      assertionData: {},
    });
  });
});

transact('EvaluationMethod delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: EvaluationMethod,
      itemId: items[0].id,
    });
  });
});
