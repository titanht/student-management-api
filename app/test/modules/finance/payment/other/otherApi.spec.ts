import Other from 'app/modules/finance/payment/other/other';
import test from 'japa';
import { OtherFactory } from './otherFactory';
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
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { PaymentFactory } from '../paymentFactory';
import { PaymentType } from 'app/modules/finance/payment/payment';
import supertest from 'supertest';
import { getCount } from 'app/services/utils';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import { expect } from 'chai';

const apiUrl = '/finance/payment/others';
const roles = ['add-other', 'edit-other', 'remove-other', 'view-other'];

const factory = OtherFactory.with('payment');

transact('StagePayment getters', () => {
  test('auth', requiresAuth(`${apiUrl}/stage`, ApiMethod.POST));
  test('authorize', requiresAuthorization(`${apiUrl}/stage`, ApiMethod.POST));
  test(
    'validate',
    validateApi(`${apiUrl}/stage`, roles, {
      reason: 'required validation failed',
      fee: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );

  test('stage', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.with('student')
      .with('user')
      .merge({ academic_year_id: ay.id })
      .merge({ attachment: 1 })
      .create();
    await payment.delete();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const fee = await OtherFactory.create();
    await fee.delete();

    const encoded = await generateEncoded(roles);

    return supertest(BASE_URL)
      .post(`${apiUrl}/stage`)
      .send({
        ...payment.serialize(),
        ...fee.serialize(),
        slip_date: '2020-01-01',
      })
      .set('Authorization', `Basic ${encoded}`)
      .expect(201)
      .then(async (_res) => {
        expect(await getCount(StagePayment)).to.equal(1);
      });
  });
});

transact('Other show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Other,
    });
  });
});

transact('Other paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Other,
    });
  });
});

transact('Other index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Other,
    });
  });
});

transact('Other create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      reason: 'required validation failed',
      fee: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );
  test('store', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.with('student')
      .with('user')
      .merge({ academic_year_id: ay.id })
      .merge({ attachment: 1 })
      .create();
    await payment.delete();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const fee = await OtherFactory.create();
    await fee.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: {
        ...payment.serialize(),
        ...fee.serialize(),
        slip_date: '2020-01-01',
      },
      model: Other,
      assertionData: {
        ...paymentData,
        slip_date: '2020-01-01',
        hidden: false,
        academic_year_id: ay.id,
        attachment: 1,
        payment_type: PaymentType.Other,
      },
      addUser: true,
    });
  });
});

transact('Other update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        reason: 'string validation failed',
      },
      { reason: [100] },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({ academic_year_id: ay.id })
      .with('student')
      .with('user')
      .create();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const itemF = await OtherFactory.merge({ payment_id: payment.id }).create();
    const item = (await Other.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Other.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Other,
      item,
      updateData,
      updateFields: ['reason'],
      assertionData: {},
    });
  });
});

transact('Other delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Other,
      itemId: items[0].id,
    });
  });
});
