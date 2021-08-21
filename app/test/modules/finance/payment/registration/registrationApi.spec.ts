import Registration from 'app/modules/finance/payment/registration/registration';
import test from 'japa';
import { RegistrationFactory } from './registrationFactory';
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
import { PaymentFactory } from '../paymentFactory';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { PaymentType } from 'app/modules/finance/payment/payment';

const apiUrl = '/finance/payment/registrations';
const roles = [
  'add-registration',
  'edit-registration',
  'remove-registration',
  'view-registration',
];

const factory = RegistrationFactory.with('payment');

transact('Registration show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Registration,
    });
  });
});

transact('Registration paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Registration,
    });
  });
});

transact('Registration index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Registration,
    });
  });
});

transact('Registration create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      fee: 'required validation failed',
      fs: 'required validation failed',
      student_id: 'required validation failed',
    })
  );
  test('validate already registered', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.with('student')
      .merge({
        academic_year_id: ay.id,
      })
      .create();
    await RegistrationFactory.merge({
      payment_id: payment.id,
    }).create();

    await validateApi(
      apiUrl,
      roles,
      {
        student_id: 'student already registered for current year',
      },
      {
        student_id: payment.student_id,
        fee: 400,
        fs: '40404040',
      }
    )();
  });
  test('store', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const student = await StudentFactory.create();
    const data = await PaymentFactory.merge({
      student_id: student.id,
    }).make();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize(), slip_date: '2020-01-01' },
      model: Registration,
      assertionData: {
        ...data.serialize(),
        academic_year_id: ay.id,
        attachment: 1,
        slip_date: '2020-01-01',
        hidden: false,
        payment_type: PaymentType.Registration,
        // payment_id:
      },
      addUser: true,
    });
  });
});

transact('Registration update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        payment_id: 'exists validation failure',
      },
      { payment_id: 100 },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const payment = await PaymentFactory.with('student')
      .with('user')
      .with('academicYear')
      .create();
    const paymentData = payment.serialize();
    delete paymentData.id;
    delete paymentData.created_at;
    delete paymentData.updated_at;
    delete paymentData.student;
    delete paymentData.user;
    delete paymentData.academicYear;

    const itemF = await RegistrationFactory.merge({
      payment_id: payment.id,
    }).create();
    const item = (await Registration.findOrFail(itemF.id)).serialize();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Registration,
      item,
      updateData: { fee: 100 },
      updateFields: ['payment_id'],
      assertionData: {
        payment_id: itemF.payment_id,
      },
    });
  });
});

transact('Registration delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Registration,
      itemId: items[0].id,
    });
  });
});
