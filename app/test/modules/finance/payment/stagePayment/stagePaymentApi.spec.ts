import StagePayment from 'app/modules/finance/payment/stagePayment/stagePayment';
import test from 'japa';
import { StagePaymentFactory } from './stagePaymentFactory';
import { ApiMethod, BASE_URL, transact } from 'app/test/testUtils';
import {
  deleteApi,
  generateEncoded,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
} from 'app/test/testUtils/api';
import { PaymentFactory } from '../paymentFactory';
import supertest from 'supertest';
import { expect } from 'chai';
import { PaymentType } from 'app/modules/finance/payment/payment';
import { genFee } from './stagePaymentService.spec';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import Fee from 'app/modules/finance/payment/fee/fee';
import { getCount } from 'app/services/utils';

const apiUrl = '/finance/payment/stage-payments';
const roles = [
  'add-stage-payment',
  'edit-stage-payment',
  'remove-stage-payment',
  'view-stage-payment',
];

const factory = StagePaymentFactory;

transact('StagePayment getters', () => {
  test('auth', requiresAuth(`${apiUrl}/is-pending`, ApiMethod.GET));
  test('auth', requiresAuth(`${apiUrl}/is-pending/fee`, ApiMethod.GET));
  test('auth', requiresAuth(`${apiUrl}/fs`, ApiMethod.GET));

  test('get fs', async () => {
    const payment = await PaymentFactory.create();
    await StagePaymentFactory.merge({ data: JSON.stringify(payment) }).create();

    const encoded = await generateEncoded(roles);

    return supertest(BASE_URL)
      .get(`${apiUrl}/fs`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: payment.fs });
      });
    // .expect({ errors: errorMessages });
  });

  test('is pending', async () => {
    const encoded = await generateEncoded(roles);

    await supertest(BASE_URL)
      .get(`${apiUrl}/is-pending`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: false });
      });
    await supertest(BASE_URL)
      .get(`${apiUrl}/is-pending/${PaymentType.Fee}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: false });
      });

    const payment = await PaymentFactory.create();
    await StagePaymentFactory.merge({
      data: JSON.stringify(payment),
      type: PaymentType.Registration,
    }).create();

    await supertest(BASE_URL)
      .get(`${apiUrl}/is-pending`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: true });
      });
    await supertest(BASE_URL)
      .get(`${apiUrl}/is-pending/${PaymentType.Fee}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: false });
      });
    await supertest(BASE_URL)
      .get(`${apiUrl}/is-pending/${PaymentType.Registration}`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then((res) => {
        expect(res.body).to.deep.equal({ data: true });
      });
  });
});

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

transact('StagePayment commit', () => {
  test('auth', requiresAuth(`${apiUrl}/commit`, ApiMethod.POST));
  test('authorize', requiresAuthorization(`${apiUrl}/commit`, ApiMethod.POST));
  test('/commit', async () => {
    const encoded = await generateEncoded(roles);
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    await genFee(ay.id);

    await supertest(BASE_URL)
      .post(`${apiUrl}/commit`)
      .set('Authorization', `Basic ${encoded}`)
      .expect(200)
      .then(async (res) => {
        const { payment: feeFirstPayment, ...feeFirst } = (
          await Fee.query().preload('payment').firstOrFail()
        ).serialize();
        const feeData = { ...feeFirstPayment, ...feeFirst };

        delete res.body.data.payment.fee[0].created_at;
        delete res.body.data.payment.fee[0].updated_at;
        delete res.body.data.payment.fee[0].hidden;
        delete feeData.created_at;
        delete feeData.updated_at;
        delete feeData.hidden;

        expect(res.body).to.deep.equal({
          data: {
            payment: {
              fee: [feeData],
              other: [],
              registration: [],
              tutorial: [],
              summer: [],
            },
            attachment: 1,
            fs: feeFirstPayment.fs,
            total: feeFirstPayment.fee,
          },
        });

        expect(await getCount(StagePayment)).to.equal(0);
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
