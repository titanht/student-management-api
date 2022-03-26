import Quarter from 'app/modules/academic/marklist/quarter/quarter';
import test from 'japa';
import { QuarterFactory } from './quarterFactory';
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
import { SemesterFactory } from '../semester/semesterFactory';

const apiUrl = '/academic/marklist/quarters';
const roles = ['add-quarter', 'edit-quarter', 'remove-quarter', 'view-quarter'];

const factory = QuarterFactory.with('semester');

transact('Quarter show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Quarter,
    });
  });
});

transact('Quarter paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Quarter,
    });
  });
});

transact('Quarter index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Quarter,
    });
  });
});

transact('Quarter create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      quarter: 'required validation failed',
      semester_id: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const data = await QuarterFactory.merge({}).create();

    await validateApi(
      apiUrl,
      roles,
      {
        quarter: 'quarter already inserted',
        semester_id: 'exists validation failure',
      },
      data.serialize()
    )();
  });
  test('store', async () => {
    const data = {
      ...(await QuarterFactory.make()).serialize(),
      semester_id: (await SemesterFactory.create()).id,
    };
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Quarter,
      assertionData: {},
    });
  });
});

transact('Quarter update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        quarter: 'number validation failed',
        semester_id: 'exists validation failure',
      },
      { quarter: 'some data', semester_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Quarter.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Quarter.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Quarter,
      item,
      updateData,
      updateFields: ['quarter', 'semester_id'],
      assertionData: {},
    });
  });
});

transact('Quarter delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Quarter,
      itemId: items[0].id,
    });
  });
});
