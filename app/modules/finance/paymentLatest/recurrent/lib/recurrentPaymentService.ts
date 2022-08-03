import { RequestContract } from '@ioc:Adonis/Core/Request';
import { transactLocalized } from 'app/services/utils';
import RecurrentPayment from '../recurrentPayment';
import RecurrentPaymentChild from '../recurrentPaymentChild/recurrentPaymentChild';
import { RecurrentPaymentVal } from './recurrentPaymentVal';

const RecurrentPaymentService = {
  findOne: (id: string) => {
    return RecurrentPayment.query()
      .preload('recurrentChildren')
      .where('id', id)
      .firstOrFail();
  },

  createRecurrent: async (request: RequestContract) => {
    const data = await request.validate(RecurrentPaymentVal);
    let recurrentId = '';

    await transactLocalized(async (trx) => {
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
      recurrentId = recurrent.id;

      for (const recurrentChild of data.payments) {
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

    return recurrentId;
  },
};

export default RecurrentPaymentService;
