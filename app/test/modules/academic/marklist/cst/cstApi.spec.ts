import Cst from 'app/modules/academic/marklist/cst/cst';
import test from 'japa';
import { CstFactory } from './cstFactory';
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
import { GradeFactory } from '../../grade/gradeFactory';
import { SubjectFactory } from '../subject/subjectFactory';
import { TeacherFactory } from '../../teacher/teacherFactory';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import supertest from 'supertest';
// import { getCount } from 'app/services/utils';

const apiUrl = '/academic/marklist/csts';
const roles = ['add-cst', 'edit-cst', 'remove-cst', 'view-cst'];

const factory = CstFactory.with('grade').with('subject').with('academicYear');

transact('Cst show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.merge({ teacher_id: 'teach' }).create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Cst,
    });
  });
});

transact('Cst paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.merge({ teacher_id: 'teach' }).create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Cst,
    });
  });
});

transact('Cst index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.merge({ teacher_id: 'teach' }).create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Cst,
    });
  });
});

transact('Cst create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test('validate unique', async () => {
    const data = {
      ...(await CstFactory.make()).serialize(),
      grade_id: (await GradeFactory.create()).id,
      subject_id: (await SubjectFactory.create()).id,
      teacher_id: (await TeacherFactory.with('user').create()).id,
      academic_year_id: (await AcademicYearFactory.create()).id,
    };
    await CstFactory.merge(data).create();

    await validateApi(
      apiUrl,
      roles,
      {
        academic_year_id:
          'Class subject teacher already assigned for academic year',
      },
      {
        ...data,
        // grade_id: (await GradeFactory.create()).id
      }
    )();
  });
  test('store', async () => {
    const data = {
      ...(await CstFactory.make()).serialize(),
      grade_id: (await GradeFactory.create()).id,
      subject_id: (await SubjectFactory.create()).id,
      teacher_id: (await TeacherFactory.with('user').create()).id,
      academic_year_id: (await AcademicYearFactory.create()).id,
    };

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data },
      model: Cst,
      assertionData: {},
    });
  });
  test('validate', async () => {
    await validateApi(apiUrl, roles, {
      grade_id: 'required validation failed',
      subject_id: 'required validation failed',
      teacher_id: 'required validation failed',
      academic_year_id: 'required validation failed',
      count: 'required validation failed',
    })();
  });
});

transact('Cst create 2', () => {
  test('store same cst for different year', async () => {
    const data = {
      ...(await CstFactory.make()).serialize(),
      grade_id: (await GradeFactory.create()).id,
      subject_id: (await SubjectFactory.create()).id,
      teacher_id: (await TeacherFactory.with('user').create()).id,
      academic_year_id: (
        await AcademicYearFactory.merge({ active: false }).create()
      ).id,
    };
    await CstFactory.merge(data).create();
    const { token } = await generateEncodedUser(roles);

    await supertest(BASE_URL)
      .post(apiUrl)
      .send({
        ...data,
        academic_year_id: (
          await AcademicYearFactory.merge({ active: true }).create()
        ).id,
      })
      .set('Authorization', `Basic ${token}`)
      .expect(201);
  });
});

transact('Cst create 3', () => {
  test('store cst for same ay and grade_id', async () => {
    const data = {
      ...(await CstFactory.make()).serialize(),
      grade_id: (await GradeFactory.create()).id,
      subject_id: (await SubjectFactory.create()).id,
      teacher_id: (await TeacherFactory.with('user').create()).id,
      academic_year_id: (
        await AcademicYearFactory.merge({ active: false }).create()
      ).id,
    };
    await CstFactory.merge(data).create();
    const { token } = await generateEncodedUser(roles);

    await supertest(BASE_URL)
      .post(apiUrl)
      .send({
        ...data,
        subject_id: (await SubjectFactory.create()).id,
        teacher_id: (await TeacherFactory.with('user').create()).id,
      })
      .set('Authorization', `Basic ${token}`)
      .expect(201);
  });
});

transact('Cst update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        grade_id: 'exists validation failure',
        subject_id: 'exists validation failure',
        teacher_id: 'exists validation failure',
        academic_year_id: 'exists validation failure',
        count: 'number validation failed',
      },
      {
        grade_id: 100,
        subject_id: 100,
        teacher_id: 100,
        academic_year_id: 100,
        count: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const teacherId = (await TeacherFactory.with('user').create()).id;
    const itemF = await factory.merge({ teacher_id: teacherId }).create();
    const item = (await Cst.findOrFail(itemF.id)).serialize();
    const updateF = await factory.merge({ teacher_id: teacherId }).create();
    const updateData = (await Cst.findOrFail(updateF.id)).serialize();
    await (await Cst.findOrFail(updateF.id)).delete();

    // console.log(await getCount(Cst));

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Cst,
      item,
      updateData,
      updateFields: [
        'grade_id',
        'subject_id',
        'teacher_id',
        'academic_year_id',
        'count',
      ],
      assertionData: {},
    });
  });
});

transact('Cst delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory
      .merge({ teacher_id: 'teacherId' })
      .createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Cst,
      itemId: items[0].id,
    });
  });
});
