import { RequestContract } from '@ioc:Adonis/Core/Request';
import { transactLocalized } from 'app/services/utils';
import RecurrentPayment from '../recurrentPayment';
import RecurrentPaymentChild from '../recurrentPaymentChild/recurrentPaymentChild';
import { RecurrentPaymentVal } from './recurrentPaymentVal';

const RecurrentPaymentService = {
  createRecurrent: async (request: RequestContract) => {
    const data = await request.validate(RecurrentPaymentVal);

    await transactLocalized(async (trx) => {
      console.log('create recurrent');
      const recurrent = await RecurrentPayment.create(
        {
          effective_date: data.effective_date,
          end_date: data.end_date,
          description: data.description,
          total_pay_count: data.payments.length,
        },
        {
          client: trx,
        }
      );

      for (const recurrentChild of data.payments) {
        console.log('create child', recurrentChild.description);
        await RecurrentPaymentChild.create(
          {
            ...recurrentChild,
            recurrent_payment_id: recurrent.id,
          },
          {
            client: trx,
          }
        );
      }
    });
  },
};

export default RecurrentPaymentService;
