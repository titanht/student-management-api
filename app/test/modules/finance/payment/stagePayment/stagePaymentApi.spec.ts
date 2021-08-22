import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import test from 'japa';
import { StagePaymentFactory } from './stagePaymentFactory';
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

const apiUrl = '/finance/payment/stage-payments';
const roles = [
  'add-stage-payment',
  'edit-stage-payment',
  'remove-stage-payment',
  'view-stage-payment',
];

const factory = StagePaymentFactory;

transact('StagePayment show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: StagePayment,
    });
  });
});

transact('StagePayment paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: StagePayment,
    });
  });
});

transact('StagePayment index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: StagePayment,
    });
  });
});

transact('StagePayment create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      data: 'required validation failed',
      type: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: StagePayment,
      assertionData: {},
    });
  });
});

transact('StagePayment update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test('validate', validateApi(`${apiUrl}/id`, roles, {}, {}, ApiMethod.PATCH));
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await StagePayment.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await StagePayment.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: StagePayment,
      item,
      updateData,
      updateFields: [],
      assertionData: {},
    });
  });
});

transact('StagePayment delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: StagePayment,
      itemId: items[0].id,
    });
  });
});
