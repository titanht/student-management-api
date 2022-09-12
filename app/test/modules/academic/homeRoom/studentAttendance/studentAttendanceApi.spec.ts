import supertest from 'supertest';
import StudentAttendance from 'app/modules/academic/homeRoom/studentAttendance/student-attendance';
import test from 'japa';
import { StudentAttendanceFactory } from './studentAttendanceFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  // deleteApi,
  // indexApi,
  // paginateApi,
  requiresAuth,
  requiresAuthorization,
  // showApi,
  // updatesApi,
  validateApi,
  generateEncoded,
} from 'app/test/testUtils/api';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';

const apiUrl = '/academic/home-room/student-attendances';
const roles = [
  'add-student-attendance',
  'edit-student-attendance',
  'remove-student-attendance',
  'view-student-attendance',
];

const factory = StudentAttendanceFactory.with('student')
  .with('user')
  .with('academicYear');

// transact('StudentAttendance show', () => {
//   test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
//   test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
//   test('/:id', async () => {
//     const data = await factory.create();
//     return showApi({
//       url: apiUrl,
//       roles,
//       data,
//       model: StudentAttendance,
//     });
//   });
// });

// transact('StudentAttendance paginate', () => {
//   test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
//   test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
//   test('/?', async () => {
//     const data = await factory.create();
//     return paginateApi({
//       url: apiUrl,
//       roles,
//       data,
//       model: StudentAttendance,
//     });
//   });
// });

// transact('StudentAttendance index', () => {
//   test('auth', requiresAuth(apiUrl, ApiMethod.GET));
//   test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
//   test('/', async () => {
//     const data = await factory.create();
//     return indexApi({
//       url: apiUrl,
//       roles,
//       data,
//       model: StudentAttendance,
//     });
//   });
// });

transact('StudentAttendance create', () => {
  test('auth', requiresAuth(`${apiUrl}/grade-id`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/grade-id`, ApiMethod.POST)
  );
  test(
    'validate',
    validateApi(`${apiUrl}/grade-id`, roles, {
      student_ids: 'required validation failed',
      statuses: 'required validation failed',
      late_reasons: 'required validation failed',
      date: 'required validation failed',
    })
  );
  // TODO: Add better unit testing
  test('store', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const data = await factory.create();
    const data2 = await factory.create();
    await data.delete();
    await data2.delete();

    const apiData = {
      student_ids: [data.student_id, data2.student_id],
      statuses: ['Present', 'Late'],
      late_reasons: [null, 'Chilling'],
      date: '2020-01-01',
    };
    expect(await getCount(StudentAttendance)).to.equal(0);

    const encoded = await generateEncoded(roles);
    await supertest(BASE_URL)
      .post(`${apiUrl}/grade-id`)
      .send(apiData)
      .set('Authorization', `Basic ${encoded}`)
      .expect(201);

    expect(await getCount(StudentAttendance)).to.equal(2);
  });
});

// transact('StudentAttendance update', () => {
//   test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
//   test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
//   test(
//     'validate',
//     validateApi(
//       `${apiUrl}/id`,
//       roles,
//       {
//         student_id: 'string validation failed',
//         user_id: 'string validation failed',
//         academic_year_id: 'string validation failed',
//         status: 'enum validation failed',
//         date: 'date validation failed',
//         late_reason: 'string validation failed',
//       },
//       {
//         student_id: 100,
//         user_id: 100,
//         academic_year_id: 100,
//         status: 'some data',
//         date: 'some data',
//         late_reason: 100,
//       },
//       ApiMethod.PATCH
//     )
//   );
//   test('update', async () => {
//     const itemF = await factory.create();
//     const item = (await StudentAttendance.findOrFail(itemF.id)).serialize();
//     const updateF = await factory.create();
//     const updateData = (
//       await StudentAttendance.findOrFail(updateF.id)
//     ).serialize();
//     await updateF.delete();

//     return updatesApi({
//       url: apiUrl,
//       roles: roles,
//       model: StudentAttendance,
//       item,
//       updateData,
//       updateFields: [
//         'student_id',
//         'user_id',
//         'academic_year_id',
//         'status',
//         'date',
//         'late_reason',
//       ],
//       assertionData: {},
//     });
//   });
// });

// transact('StudentAttendance delete', () => {
//   test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
//   test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
//   test('delete', async () => {
//     const items = await factory.createMany(2);

//     return deleteApi({
//       url: apiUrl,
//       roles,
//       model: StudentAttendance,
//       itemId: items[0].id,
//     });
//   });
// });
