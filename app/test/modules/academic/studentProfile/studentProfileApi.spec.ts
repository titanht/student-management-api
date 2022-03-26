import StudentProfile from 'app/modules/academic/studentProfile/studentProfile';
import test from 'japa';
import { StudentProfileFactory } from './studentProfileFactory';
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

const apiUrl = '/academic/student-profiles';
const roles = [
  'add-student-profile',
  'edit-student-profile',
  'remove-student-profile',
  'view-student-profile',
];

const factory = StudentProfileFactory.with('student');

transact('StudentProfile show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: StudentProfile,
    });
  });
});

transact('StudentProfile paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: StudentProfile,
    });
  });
});

transact('StudentProfile index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: StudentProfile,
    });
  });
});

transact('StudentProfile create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      student_id: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: StudentProfile,
      assertionData: {},
    });
  });
});

transact('StudentProfile update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        first_name: 'string validation failed',
        nationality: 'string validation failed',
        address_city: 'string validation failed',
        address_sub_city: 'string validation failed',
        address_woreda: 'string validation failed',
        house_number: 'string validation failed',
        student_phone_number: 'string validation failed',
        other_health_status: 'string validation failed',
        previous_school_name: 'string validation failed',
        previous_school_city: 'string validation failed',
        previous_school_sub_city: 'string validation failed',
        previous_school_woreda: 'string validation failed',
        school_leave_other: 'string validation failed',
        entry_class: 'string validation failed',
        parent_name: 'string validation failed',
        occupation: 'string validation failed',
        work_place: 'string validation failed',
        parent_phone_number: 'string validation failed',
        student_living_with: 'string validation failed',
        date_of_birth: 'the input "some data" can\'t be parsed as ISO 8601',
        student_photo: 'string validation failed',
        parent_photo: 'string validation failed',
        emergencies: 'string validation failed',
        student_id: 'exists validation failure',
        health_status:
          'The value of health_status must be in FULLY_HEALTHY,PARAPLEGIC,OTHER',
        previous_school_leave_reason:
          'The value of previous_school_leave_reason must be in TRANSFER,DISCIPLINE_ISSUE,Other',
        father_condition:
          'The value of father_condition must be in ALIVE,DEAD,ALIVE_BUT_DOES_NOT_LIVE_TOGETHER',
        mother_condition:
          'The value of mother_condition must be in ALIVE,DEAD,ALIVE_BUT_DOES_NOT_LIVE_TOGETHER',
      },
      {
        first_name: 100,
        nationality: 100,
        address_city: 100,
        address_sub_city: 100,
        address_woreda: 100,
        house_number: 100,
        student_phone_number: 100,
        other_health_status: 100,
        previous_school_name: 100,
        previous_school_city: 100,
        previous_school_sub_city: 100,
        previous_school_woreda: 100,
        school_leave_other: 100,
        entry_class: 100,
        parent_name: 100,
        occupation: 100,
        work_place: 100,
        parent_phone_number: 100,
        student_living_with: 100,
        date_of_birth: 'some data',
        student_photo: 100,
        parent_photo: 100,
        emergencies: 100,
        student_id: 100,
        health_status: 'some data',
        previous_school_leave_reason: 'some data',
        father_condition: 'some data',
        mother_condition: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await StudentProfile.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (
      await StudentProfile.findOrFail(updateF.id)
    ).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: StudentProfile,
      item,
      updateData,
      updateFields: [
        'first_name',
        'nationality',
        'address_city',
        'address_sub_city',
        'address_woreda',
        'house_number',
        'student_phone_number',
        'other_health_status',
        'previous_school_name',
        'previous_school_city',
        'previous_school_sub_city',
        'previous_school_woreda',
        'school_leave_other',
        'entry_class',
        'parent_name',
        'occupation',
        'work_place',
        'parent_phone_number',
        'student_living_with',
        'date_of_birth',
        'student_photo',
        'parent_photo',
        'emergencies',
        'student_id',
        'health_status',
        'previous_school_leave_reason',
        'father_condition',
        'mother_condition',
      ],
      assertionData: {},
    });
  });
});

transact('StudentProfile delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: StudentProfile,
      itemId: items[0].id,
    });
  });
});
