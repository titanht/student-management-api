import Student from 'app/modules/academic/student/student';
import test from 'japa';
import { StudentFactory } from './studentFactory';
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

const apiUrl = '/academic/students';
const roles = ['add-student', 'edit-student', 'remove-student', 'view-student'];

const factory = StudentFactory;

transact('Student show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Student,
    });
  });
});

transact('Student paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Student,
    });
  });
});

transact('Student index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Student,
    });
  });
});

transact('Student create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      first_name: 'required validation failed',
      father_name: 'required validation failed',
      gender: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = (await StudentFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Student,
      assertionData: {},
    });
  });
});

transact('Student update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        first_name: 'string validation failed',
        father_name: 'string validation failed',
        gender: 'The value of gender must be in Male,Female',
        grand_father_name: 'string validation failed',
        id_number: 'string validation failed',
        primary_phone: 'string validation failed',
        img: 'string validation failed',
        scholarship_amount: 'number validation failed',
      },
      {
        first_name: 100,
        father_name: 100,
        gender: 'some data',
        grand_father_name: 100,
        id_number: 100,
        primary_phone: 100,
        img: 100,
        scholarship_amount: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Student.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Student.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Student,
      item,
      updateData,
      updateFields: [
        'first_name',
        'father_name',
        'gender',
        'grand_father_name',
        'id_number',
        'primary_phone',
        'img',
        'scholarship_amount',
      ],
      assertionData: {},
    });
  });
});

transact('Student delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Student,
      itemId: items[0].id,
    });
  });
});
