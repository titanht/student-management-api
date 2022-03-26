import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import test from 'japa';
import { GradeStudentFactory } from './gradeStudentFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  generateEncodedUser,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';
import { StudentFactory } from '../student/studentFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { AcademicYearFactory } from '../academicYear/academicFactory';
import supertest from 'supertest';
import { getCount, getOne } from 'app/services/utils';
import { expect } from 'chai';

const apiUrl = '/academic/grade-students';
const roles = ['add-student', 'edit-student', 'remove-student', 'view-student'];

const factory = GradeStudentFactory.with('grade')
  .with('student')
  .with('academicYear');

transact('GradeStudent promote', () => {
  test('auth', requiresAuth(`${apiUrl}/promote-grade`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/promote-grade`, ApiMethod.POST)
  );
  test(
    'validate',
    validateApi(
      `${apiUrl}/promote-grade`,
      roles,
      {
        'academic_year_id': 'required validation failed',
        'grade_id': 'required validation failed',
        'student_ids.0': 'exists validation failure',
      },
      {
        student_ids: ['d'],
      }
    )
  );
  test('promote', async () => {
    const gradeId = (await GradeFactory.create()).id;
    const studentId = (await StudentFactory.create()).id;
    const yearId = (await AcademicYearFactory.create()).id;

    const { token } = await generateEncodedUser(roles);

    // console.log(`${BASE_URL}/${apiUrl}/${data.id}/change-grade`);

    return supertest(BASE_URL)
      .post(`${apiUrl}/promote-grade`)
      .send({
        grade_id: gradeId,
        academic_year_id: yearId,
        student_ids: [studentId],
      })
      .set('Authorization', `Basic ${token}`)
      .expect(201)
      .then(async (_res) => {
        expect(await getCount(GradeStudent)).to.equal(1);
      });
  });
});

transact('GradeStudent change grade', () => {
  test('auth', requiresAuth(`${apiUrl}/gs-id/change-grade`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/gs-id/change-grade`, ApiMethod.POST)
  );
  test(
    'validate',
    validateApi(
      `${apiUrl}/gs-id/change-grade`,
      roles,
      {
        grade_id: 'exists validation failure',
      },
      {
        grade_id: 'g-id',
      }
    )
  );
  test('change grade', async () => {
    const data = await factory.create();
    const gradeId = (await GradeFactory.create()).id;

    const { token } = await generateEncodedUser(roles);

    // console.log(`${BASE_URL}/${apiUrl}/${data.id}/change-grade`);

    return supertest(BASE_URL)
      .post(`${apiUrl}/${data.id}/change-grade`)
      .send({
        grade_id: gradeId,
      })
      .set('Authorization', `Basic ${token}`)
      .expect(200)
      .then(async (_res) => {
        const updatedData = await getOne(GradeStudent, data.id);
        expect(updatedData.grade_id).to.equal(gradeId);
      });
  });
});

transact('GradeStudent show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: GradeStudent,
    });
  });
});

transact('GradeStudent paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: GradeStudent,
    });
  });
});

transact('GradeStudent index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: GradeStudent,
    });
  });
});

transact('GradeStudent create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test('validate unique student + aca_year', async () => {
    const data = {
      student_id: (await StudentFactory.create()).id,
      grade_id: (await GradeFactory.create()).id,
      academic_year_id: (await AcademicYearFactory.create()).id,
    };
    await GradeStudentFactory.merge(data).create();

    await validateApi(
      apiUrl,
      roles,
      {
        student_id: 'Student already assigned grade for year',
      },
      { ...data, grade_id: (await GradeFactory.create()).id }
    )();
  });
  test('store', async () => {
    const data = {
      student_id: (await StudentFactory.create()).id,
      grade_id: (await GradeFactory.create()).id,
      academic_year_id: (await AcademicYearFactory.create()).id,
    };
    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: GradeStudent,
      assertionData: {},
    });
  });
  test(
    'validate',
    validateApi(apiUrl, roles, {
      grade_id: 'required validation failed',
      student_id: 'required validation failed',
      academic_year_id: 'required validation failed',
    })
  );
});

transact('GradeStudent update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        grade_id: 'exists validation failure',
        student_id: 'exists validation failure',
        academic_year_id: 'exists validation failure',
      },
      { grade_id: 100, student_id: 100, academic_year_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await GradeStudent.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await GradeStudent.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: GradeStudent,
      item,
      updateData,
      updateFields: ['grade_id', 'student_id', 'academic_year_id'],
      assertionData: {},
    });
  });
});

transact('GradeStudent delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: GradeStudent,
      itemId: items[0].id,
    });
  });
});
