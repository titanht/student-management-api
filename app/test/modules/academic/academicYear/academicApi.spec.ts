import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import test from 'japa';
import { AcademicYearFactory } from './academicFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
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
  generateEncoded,
} from 'app/test/testUtils/api';
import supertest from 'supertest';
import { expect } from 'chai';

const apiUrl = `/academic/academic-years`;
const roles = [
  'add-academic-year',
  'edit-academic-year',
  'remove-academic-year',
  'view-academic-year',
  'set-active-year',
];

const factory = AcademicYearFactory;

transact('Set active year', () => {
  test('auth', requiresAuth(`${apiUrl}/set-active/id`, ApiMethod.POST));
  test(
    'authorize',
    requiresAuthorization(`${apiUrl}/set-active/id`, ApiMethod.POST)
  );
  test('changes', async () => {
    const yr = await factory.merge({ active: false }).create();

    const encoded = await generateEncoded(roles);

    await supertest(BASE_URL)
      .post(`${apiUrl}/set-active/${yr.id}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200);

    const activeYr = await AcademicYear.getActiveYear();
    expect(activeYr.id).to.equal(yr.id);
  });
});

transact('Get active academic year', () => {
  test('auth', requiresAuth(`${apiUrl}/active`, ApiMethod.GET));
  test('get active none', async () => {
    await factory.merge({ active: false }).create();

    const encoded = await generateEncoded(roles);

    await supertest(BASE_URL)
      .get(`${apiUrl}/active`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(404);
  });
  test('active returns valid year', async () => {
    const yr = await factory.merge({ active: true }).create();
    const year = (await AcademicYear.findOrFail(yr.id)).serialize();

    const encoded = await generateEncoded(roles);

    await supertest(BASE_URL)
      .get(`${apiUrl}/active`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal(year);
      });
  });
});

transact('Academic Year show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: AcademicYear,
    });
  });
});

transact('Academic Year paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: AcademicYear,
    });
  });
});

transact('Academic Year index', () => {
  // test.only('auth', requiresAuth(apiUrl, ApiMethod.GET));
  // test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: AcademicYear,
    });
  });
});

transact('Academic Year create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, ['add-academic-year'], {
      year: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = (await AcademicYearFactory.make()).serialize();
    return createsApi({
      url: apiUrl,
      roles: ['add-academic-year'],
      data: { ...data, active: true },
      model: AcademicYear,
      assertionData: { active: false },
    });
  });

  test('validate', async () => {
    const data = (await AcademicYearFactory.create()).serialize();

    await validateApi(
      apiUrl,
      ['add-academic-year'],
      {
        year: 'year already inserted',
      },
      data
    )();
  });
});

transact('Academic Year update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        year: 'number validation failed',
      },
      { year: 'dd' },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await AcademicYear.findOrFail(itemF.id)).serialize();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: AcademicYear,
      item,
      updateData: { year: 2014 },
      updateFields: ['year'],
      assertionData: {},
    });
  });
});

transact('Academic Year delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: AcademicYear,
      itemId: items[0].id,
    });
  });
});
