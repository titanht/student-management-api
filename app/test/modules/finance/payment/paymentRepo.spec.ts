import test from 'japa';
import { transact } from 'app/test/testUtils';
import PaymentRepo from 'app/modules/finance/payment/paymentRepo';
import { expect } from 'chai';
import { PaymentFactory } from './paymentFactory';

const paymentRepo = new PaymentRepo();

transact('getAttachment', () => {
  test('returns greatest attachment number + 1', async () => {
    await PaymentFactory.merge({ attachment: 3 }).create();
    await PaymentFactory.merge({ attachment: 5 }).create();
    await PaymentFactory.merge({ attachment: 4 }).create();

    expect(await paymentRepo.getAttachmentNumber()).to.equal(6);
  });

  test('returns 1 when no payments exist', async () => {
    expect(await paymentRepo.getAttachmentNumber()).to.equal(1);
  });
});
