import Teacher from 'app/modules/academic/teacher/teacher';
import test from 'japa';
import { TeacherFactory } from './teacherFactory';
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
import { UserFactory } from '../../auth/userFactory';

const apiUrl = '/academic/teachers';
const roles = ['add-teacher', 'edit-teacher', 'remove-teacher', 'view-teacher'];

const factory = TeacherFactory.with('user');

transact('Teacher show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Teacher,
    });
  });
});

transact('Teacher paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();

    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Teacher,
    });
  });
});

transact('Teacher index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Teacher,
    });
  });
});

transact('Teacher create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      user_id: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const data = (
      await TeacherFactory.merge({
        user_id: (await UserFactory.create()).id,
      }).create()
    ).serialize();

    await validateApi(
      apiUrl,
      roles,
      {
        user_id: 'user_id already inserted',
      },
      data
    )();
  });
  test('store', async () => {
    const data = {
      user_id: (await UserFactory.create()).id,
    };
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Teacher,
      assertionData: {},
    });
  });
});

transact('Teacher update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        user_id: 'exists validation failure',
      },
      { user_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Teacher.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Teacher.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Teacher,
      item,
      updateData,
      updateFields: ['semester'],
      assertionData: {},
    });
  });
});

transact('Teacher delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Teacher,
      itemId: items[0].id,
    });
  });
});
