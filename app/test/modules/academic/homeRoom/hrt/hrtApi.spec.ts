import { base64 } from '@poppinss/utils/build/helpers';
import supertest from 'supertest';
import Hrt from 'app/modules/academic/homeRoom/hrt/hrt';
import test from 'japa';
import { HrtFactory } from './hrtFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  generateEncoded,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';
import { GradeFactory } from '../../grade/gradeFactory';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import { expect } from 'chai';
import Grade from 'app/modules/academic/grade/grade';
import { UserFactory } from 'app/test/modules/auth/userFactory';

const apiUrl = '/academic/home-room/hrts';
const roles = ['add-hrt', 'edit-hrt', 'remove-hrt', 'view-hrt'];

const factory = HrtFactory.with('grade').with('user');

transact('Fetch grade-students', () => {
  test('auth', requiresAuth(`${apiUrl}/fetch-grade`, ApiMethod.GET));
  test('throws not found if not assigned', async () => {
    const encoded = await generateEncoded(roles);
    await supertest(BASE_URL)
      .get(`${apiUrl}/fetch-grade`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(404);
  });
  test('returns grade', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const user = await UserFactory.create();
    const encoded = base64.encode(`${user.email}:secret`);
    const grf = await GradeFactory.create();
    const grade = (await Grade.findOrFail(grf.id)).serialize();
    await HrtFactory.merge({ user_id: user.id, grade_id: grade.id }).create();

    await supertest(BASE_URL)
      .get(`${apiUrl}/fetch-grade`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({
          data: {
            ...grade,
            students: [],
          },
        });
      });
  });
});

transact('Hrt show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Hrt,
    });
  });
});

transact('Hrt paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Hrt,
    });
  });
});

transact('Hrt index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Hrt,
    });
  });
});

transact('Hrt create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test('validate unique', async () => {
    const data = await factory.create();

    await validateApi(
      apiUrl,
      roles,
      {
        user_id: 'user already assigned to class',
      },
      data.serialize()
    )();
  });
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: Hrt,
      assertionData: {},
    });
  });
  test(
    'validate',
    validateApi(apiUrl, roles, {
      grade_id: 'required validation failed',
      user_id: 'required validation failed',
    })
  );
});

transact('Hrt update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        grade_id: 'exists validation failure',
        user_id: 'exists validation failure',
      },
      { grade_id: 100, user_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Hrt.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Hrt.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Hrt,
      item,
      updateData,
      updateFields: ['grade_id', 'user_id'],
      assertionData: {},
    });
  });
});

transact('Hrt delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Hrt,
      itemId: items[0].id,
    });
  });
});
