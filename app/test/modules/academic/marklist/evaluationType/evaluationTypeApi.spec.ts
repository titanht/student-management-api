import EvaluationType from 'app/modules/academic/marklist/evaluationType/evaluationType';
import test from 'japa';
import { EvaluationTypeFactory } from './evaluationTypeFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';

const apiUrl = '/academic/marklist/evaluation-types';
const roles = [
  'add-evaluation-type',
  'edit-evaluation-type',
  'remove-evaluation-type',
  'view-evaluation-type',
];

const factory = EvaluationTypeFactory;

transact('EvaluationType show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationType,
    });
  });
});

transact('EvaluationType paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationType,
    });
  });
});

transact('EvaluationType index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: EvaluationType,
    });
  });
});

transact('EvaluationType create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      name: 'required validation failed',
      weight: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const data = (await EvaluationTypeFactory.create()).serialize();

    await validateApi(
      apiUrl,
      roles,
      {
        name: 'name already inserted',
      },
      data
    )();
  });
  test('store', async () => {
    const data = (await EvaluationTypeFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: EvaluationType,
      assertionData: {},
    });
  });
});

transact('EvaluationType update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        name: 'string validation failed',
        weight: 'number validation failed',
      },
      { name: 100, weight: 'some data' },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await EvaluationType.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (
      await EvaluationType.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: EvaluationType,
      item,
      updateData,
      updateFields: ['name', 'weight'],
      assertionData: {},
    });
  });
});

transact('EvaluationType delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: EvaluationType,
      itemId: items[0].id,
    });
  });
});
