import Fee from 'app/modules/finance/payment/fee/fee';
import test from 'japa';
import { FeeFactory } from './feeFactory';
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

const apiUrl = '/finance/payment/fees';
const roles = ['add-fee', 'edit-fee', 'remove-fee', 'view-fee'];

const factory = FeeFactory.with('payment', 1, (payment) => {
  payment.merge({ attachment: 1 });
});

transact('Fee show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Fee,
    });
  });
});

transact('Fee paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Fee,
    });
  });
});

transact('Fee index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Fee,
    });
  });
});

transact('Fee create', () => {
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
      .merge({ academic_year_id: ay.id })
      .create();
    const fee = await FeeFactory.merge({ payment_id: payment.id }).create();

    await validateApi(
      apiUrl,
      roles,
      {
        month: 'fee already paid for this month',
      },
      {
        fee: payment.fee,
        student_id: payment.student_id,
        month: fee.month,
        fs: '10001000',
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

    const fee = await factory.create();
    await fee.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: {
        ...payment.serialize(),
        hidden: true,
        ...fee.serialize(),
        slip_date: '2020-01-01',
      },
      model: Fee,
      assertionData: {
        ...paymentData,
        slip_date: '2020-01-01',
        hidden: false,
        academic_year_id: ay.id,
        attachment: 2,
      },
      addUser: true,
    });
  });
});

transact('Fee update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        penalty: 'number validation failed',
        scholarship: 'number validation failed',
      },
      {
        penalty: 'some data',
        scholarship: 'some data',
      },
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

    const itemF = await FeeFactory.merge({ payment_id: payment.id }).create();
    const item = (await Fee.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Fee.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Fee,
      item,
      updateData,
      updateFields: ['month', 'penalty', 'scholarship'],
      assertionData: {
        // ...paymentData,
      },
    });
  });
});

transact('Fee delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Fee,
      itemId: items[0].id,
    });
  });
});
