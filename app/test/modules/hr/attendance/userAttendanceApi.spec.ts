import UserAttendance from 'app/modules/hr/attendance/userAttendance';
import test from 'japa';
import { UserAttendanceFactory } from './userAttendanceFactory';
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

const apiUrl = '/hr/attendances';
const roles = [
  'add-user-attendance',
  'edit-user-attendance',
  'remove-user-attendance',
  'view-user-attendance',
];

const factory = UserAttendanceFactory;

transact('UserAttendance show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: UserAttendance,
    });
  });
});

transact('UserAttendance paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: UserAttendance,
    });
  });
});

transact('UserAttendance index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: UserAttendance,
    });
  });
});

transact('UserAttendance create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      date: 'required validation failed',
      user_id: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: UserAttendance,
      assertionData: {},
    });
  });
});

transact('UserAttendance update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        date: 'date validation failed',
        day_week: 'number validation failed',
        week_year: 'number validation failed',
        month: 'number validation failed',
        time_in: 'string validation failed',
        time_out: 'string validation failed',
        present_in: 'boolean validation failed',
        present_out: 'boolean validation failed',
        late_in: 'boolean validation failed',
        early_out: 'boolean validation failed',
        only_in: 'boolean validation failed',
        only_out: 'boolean validation failed',
        user_id: 'string validation failed',
      },
      {
        date: 'some data',
        day_week: 'some data',
        week_year: 'some data',
        month: 'some data',
        time_in: 100,
        time_out: 100,
        present_in: 'some data',
        present_out: 'some data',
        late_in: 'some data',
        early_out: 'some data',
        only_in: 'some data',
        only_out: 'some data',
        user_id: 100,
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await UserAttendance.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (
      await UserAttendance.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: UserAttendance,
      item,
      updateData,
      updateFields: [
        'date',
        'day_week',
        'week_year',
        'month',
        'time_in',
        'time_out',
        'present_in',
        'present_out',
        'late_in',
        'early_out',
        'only_in',
        'only_out',
        'user_id',
      ],
      assertionData: {},
    });
  });
});

transact('UserAttendance delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: UserAttendance,
      itemId: items[0].id,
    });
  });
});
