import Subject from 'app/modules/academic/marklist/subject/subject';
import test from 'japa';
import { SubjectFactory } from './subjectFactory';
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

const apiUrl = '/academic/marklist/subjects';
const roles = ['add-subject', 'edit-subject', 'remove-subject', 'view-subject'];

const factory = SubjectFactory;

transact('Subject show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Subject,
    });
  });
});

transact('Subject paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Subject,
    });
  });
});

transact('Subject index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Subject,
    });
  });
});

transact('Subject create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      subject: 'required validation failed',
      code: 'required validation failed',
      consider_for_rank: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const data = (await SubjectFactory.create()).serialize();

    await validateApi(
      apiUrl,
      roles,
      {
        subject: 'subject already inserted',
        code: 'code already inserted',
      },
      data
    )();
  });
  test('store', async () => {
    const data = (await SubjectFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data, consider_for_rank: true },
      model: Subject,
      assertionData: { consider_for_rank: true },
    });
  });
});

transact('Subject update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        subject: 'string validation failed',
        code: 'string validation failed',
        consider_for_rank: 'boolean validation failed',
      },
      { subject: 100, code: 100, consider_for_rank: 'some data' },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Subject.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Subject.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Subject,
      item,
      updateData: { ...updateData, code: 'cd' },
      updateFields: ['subject', 'code'],
      assertionData: {},
    });
  });
});

transact('Subject delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Subject,
      itemId: items[0].id,
    });
  });
});
