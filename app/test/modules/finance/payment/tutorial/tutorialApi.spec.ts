import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
import test from 'japa';
import { TutorialFactory } from './tutorialFactory';
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
import { PaymentFactory } from '../paymentFactory';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { PaymentType } from 'app/modules/finance/payment/payment';
import supertest from 'supertest';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';
import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';

const apiUrl = '/finance/payment/tutorials';
const roles = [
  'add-tutorial',
  'edit-tutorial',
  'remove-tutorial',
  'view-tutorial',
];

const factory = TutorialFactory.with('payment', 1, (pf) => {
  pf.merge({ attachment: 1 });
});

transact('StagePayment getters', () => {
  test('auth', requiresAuth(`${apiUrl}/stage`, ApiMethod.POST));
  test('authorize', requiresAuthorization(`${apiUrl}/stage`, ApiMethod.POST));
  test(
    'validate',
    validateApi(`${apiUrl}/stage`, roles, {
      month: 'required validation failed',
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
      .create();
    await payment.delete();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const fee = await TutorialFactory.create();
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

transact('Tutorial show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Tutorial,
    });
  });
});

transact('Tutorial paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Tutorial,
    });
  });
});

transact('Tutorial index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Tutorial,
    });
  });
});

transact('Tutorial create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      month: 'required validation failed',
      fee: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );
  test('validate duplicate', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.with('student')
      .with('user')
      .merge({ academic_year_id: ay.id, payment_type: PaymentType.Tutorial })
      .create();
    const tutorial = await TutorialFactory.merge({
      payment_id: payment.id,
    }).create();

    await validateApi(
      apiUrl,
      roles,
      {
        month: 'tutorial fee already paid for this month',
      },
      {
        fs: payment.fs,
        month: tutorial.month,
        student_id: payment.student_id,
        fee: payment.fee,
      }
    )();
  });
  test('store', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.with('student')
      .with('user')
      .merge({ academic_year_id: ay.id })
      .create();
    await payment.delete();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const fee = await TutorialFactory.create();
    await fee.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: {
        ...payment.serialize(),
        ...fee.serialize(),
        slip_date: '2020-01-01',
      },
      model: Tutorial,
      assertionData: {
        ...paymentData,
        slip_date: '2020-01-01',
        hidden: false,
        academic_year_id: ay.id,
        attachment: 1,
        payment_type: PaymentType.Tutorial,
      },
      addUser: true,
    });
  });
});

transact('Tutorial update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        fee: 'number validation failed',
      },
      { fee: 'dd' },
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

    const itemF = await TutorialFactory.merge({
      payment_id: payment.id,
    }).create();
    const item = (await Tutorial.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Tutorial.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Tutorial,
      item,
      updateData,
      updateFields: ['month'],
      assertionData: {
        // ...paymentData,
      },
    });
  });
});

transact('Tutorial delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Tutorial,
      itemId: items[0].id,
    });
  });
});
