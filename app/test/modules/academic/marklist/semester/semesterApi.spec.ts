import Semester from 'app/modules/academic/marklist/semester/semester';
import test from 'japa';
import { SemesterFactory } from './semesterFactory';
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

const apiUrl = '/academic/marklist/semesters';
const roles = [
  'add-semester',
  'edit-semester',
  'remove-semester',
  'view-semester',
];

const factory = SemesterFactory;

transact('Semester show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Semester,
    });
  });
});

transact('Semester paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Semester,
    });
  });
});

transact('Semester index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Semester,
    });
  });
});

transact('Semester create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      semester: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const data = (await SemesterFactory.create()).serialize();

    await validateApi(
      apiUrl,
      roles,
      {
        semester: 'semester already inserted',
      },
      data
    )();
  });
  test('store', async () => {
    const data = (await SemesterFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Semester,
      assertionData: {},
    });
  });
});

transact('Semester update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        semester: 'number validation failed',
      },
      { semester: 'some data' },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Semester.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Semester.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Semester,
      item,
      updateData,
      updateFields: ['semester'],
      assertionData: {},
    });
  });
});

transact('Semester delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Semester,
      itemId: items[0].id,
    });
  });
});
