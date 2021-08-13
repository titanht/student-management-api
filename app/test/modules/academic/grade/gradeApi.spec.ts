import Grade from 'app/modules/academic/grade/grade';
import test from 'japa';
import { GradeFactory } from './gradeFactory';
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

const apiUrl = '/academic/grades';
const roles = ['add-grade', 'edit-grade', 'remove-grade', 'view-grade'];

const factory = GradeFactory;

transact('Grade show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Grade,
    });
  });
});

transact('Grade paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Grade,
    });
  });
});

transact('Grade index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Grade,
    });
  });
});

transact('Grade create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      name: 'required validation failed',
      monthly_fee: 'required validation failed',
      registration_fee: 'required validation failed',
      tutorial_fee: 'required validation failed',
      summer_fee: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = (await GradeFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Grade,
      assertionData: {},
    });
  });
  test('unique', async () => {
    const data = (await GradeFactory.create()).serialize();
    await validateApi(
      apiUrl,
      roles,
      {
        name: 'name already inserted',
      },
      data
    )();
  });
});

transact('Grade update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        name: 'string validation failed',
        monthly_fee: 'number validation failed',
        registration_fee: 'number validation failed',
        tutorial_fee: 'number validation failed',
        summer_fee: 'number validation failed',
      },
      {
        name: 100,
        monthly_fee: 'some data',
        registration_fee: 'some data',
        tutorial_fee: 'some data',
        summer_fee: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Grade.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Grade.findOrFail(updateF.id)).serialize();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Grade,
      item,
      updateData: { ...updateData, name: 'grader' },
      updateFields: [
        'name',
        'monthly_fee',
        'registration_fee',
        'tutorial_fee',
        'summer_fee',
      ],
      assertionData: {},
    });
  });
});

transact('Grade delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Grade,
      itemId: items[0].id,
    });
  });
});
