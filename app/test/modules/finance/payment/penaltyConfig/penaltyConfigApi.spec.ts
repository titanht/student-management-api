import PenaltyConfig from 'app/modules/finance/payment/penaltyConfig/penaltyConfig';
import test from 'japa';
import { PenaltyConfigFactory } from './penaltyConfigFactory';
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

const apiUrl = '/finance/payment/penalty-configs';
const roles = ['add-fee', 'edit-fee', 'remove-fee', 'view-fee'];

const factory = PenaltyConfigFactory;

transact('PenaltyConfig show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: PenaltyConfig,
    });
  });
});

transact('PenaltyConfig paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: PenaltyConfig,
    });
  });
});

transact('PenaltyConfig index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: PenaltyConfig,
    });
  });
});

transact('PenaltyConfig create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      deadline_days: 'required validation failed',
      fixed_penalty_days: 'required validation failed',
      fixed_penalty_fee: 'required validation failed',
      incrementing_penalty_fee: 'required validation failed',
      incrementing_penalty_days: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: PenaltyConfig,
      assertionData: {},
    });
  });
});

transact('PenaltyConfig update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        deadline_days: 'number validation failed',
        fixed_penalty_days: 'number validation failed',
        fixed_penalty_fee: 'number validation failed',
        incrementing_penalty_fee: 'number validation failed',
        incrementing_penalty_days: 'number validation failed',
      },
      {
        deadline_days: 'some data',
        fixed_penalty_days: 'some data',
        fixed_penalty_fee: 'some data',
        incrementing_penalty_fee: 'some data',
        incrementing_penalty_days: 'some data',
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await PenaltyConfig.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await PenaltyConfig.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: PenaltyConfig,
      item,
      updateData,
      updateFields: [
        'deadline_days',
        'fixed_penalty_days',
        'fixed_penalty_fee',
        'incrementing_penalty_fee',
        'incrementing_penalty_days',
      ],
      assertionData: {},
    });
  });
});

transact('PenaltyConfig delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: PenaltyConfig,
      itemId: items[0].id,
    });
  });
});
