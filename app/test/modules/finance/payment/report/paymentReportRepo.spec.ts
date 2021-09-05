import test from 'japa';
import { transact } from 'app/test/testUtils';
import { PaymentFactory } from '../paymentFactory';
import Payment from 'app/modules/finance/payment/payment';
import { DateTime } from 'luxon';

transact('paymentReport', () => {
  test('daily report', async () => {
    const payment = await PaymentFactory.merge({
      created_at: DateTime.local(2017, 5, 15, 8, 30),
    }).create();
    console.log(DateTime.local(2017, 5, 15, 8, 30).toFormat('YYYY-MM-DD'));

    const payments = (await Payment.all()).map((i) => i.serialize());
    console.log(payments);
  });
});
