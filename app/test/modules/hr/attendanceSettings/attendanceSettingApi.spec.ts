import AttendanceSetting from 'app/modules/hr/attendanceSettings/attendanceSetting';
import test from 'japa';
import { AttendanceSettingFactory } from './attendanceSettingFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  validateApi,
} from 'app/test/testUtils/api';

const apiUrl = '/hr/attendance-settings';
const roles = [
  'add-attendance-setting',
  'edit-attendance-setting',
  'remove-attendance-setting',
  'view-attendance-setting',
];

const factory = AttendanceSettingFactory;

transact('AttendanceSetting show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceSetting,
    });
  });
});

transact('AttendanceSetting paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceSetting,
    });
  });
});

transact('AttendanceSetting index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceSetting,
    });
  });
});

transact('AttendanceSetting create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      in_begin: 'required validation failed',
      in_end: 'required validation failed',
      late_in: 'required validation failed',
      out_begin: 'required validation failed',
      out_end: 'required validation failed',
      early_out: 'required validation failed',
      title: 'required validation failed',
    })
  );
  test(
    'validate time',
    validateApi(
      apiUrl,
      roles,
      {
        in_begin: 'time format invalid use (hh:mm am|pm)',
        in_end: 'required validation failed',
        late_in: 'required validation failed',
        out_begin: 'required validation failed',
        out_end: 'required validation failed',
        early_out: 'required validation failed',
        title: 'required validation failed',
      },
      { in_begin: '0' }
    )
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: AttendanceSetting,
      assertionData: {},
    });
  });
});

transact('AttendanceSetting delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: AttendanceSetting,
      itemId: items[0].id,
    });
  });
});
