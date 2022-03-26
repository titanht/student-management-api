import AttendanceMapping from 'app/modules/hr/attendanceMappings/attendanceMapping';
import test from 'japa';
import { AttendanceMappingFactory } from './attendanceMappingFactory';
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
import { AttendanceSettingFactory } from '../attendanceSettings/attendanceSettingFactory';
import { UserFactory } from '../../auth/userFactory';

const apiUrl = '/hr/attendance-mappings';
const roles = [
  'add-attendance-mapping',
  'edit-attendance-mapping',
  'remove-attendance-mapping',
  'view-attendance-mapping',
];

const factory = AttendanceMappingFactory.with('attendanceSetting').with('user');

transact('AttendanceMapping show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceMapping,
    });
  });
});

transact('AttendanceMapping paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceMapping,
    });
  });
});

transact('AttendanceMapping index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: AttendanceMapping,
    });
  });
});

transact('AttendanceMapping create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      account_id: 'required validation failed',
      attendance_setting_id: 'required validation failed',
      user_id: 'required validation failed',
    })
  );
  test('validate unique', async () => {
    const mapping = await factory.create();

    await validateApi(
      apiUrl,
      roles,
      {
        account_id: 'account_id already inserted',
        attendance_setting_id: 'required validation failed',
        user_id: 'user_id already inserted',
      },
      {
        account_id: mapping.account_id,
        user_id: mapping.user_id,
      }
    )();
  });
  test('store', async () => {
    const att = await AttendanceSettingFactory.create();
    const user = await UserFactory.create();

    return createsApi({
      url: apiUrl,
      roles,
      data: {
        user_id: user.id,
        account_id: 'account_id',
        attendance_setting_id: att.id,
      },
      model: AttendanceMapping,
      assertionData: {},
    });
  });
});

transact('AttendanceMapping update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        account_id: 'string validation failed',
      },
      { account_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await AttendanceMapping.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (
      await AttendanceMapping.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: AttendanceMapping,
      item,
      updateData,
      updateFields: ['account_id'],
      assertionData: {},
    });
  });
});

transact('AttendanceMapping delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: AttendanceMapping,
      itemId: items[0].id,
    });
  });
});
