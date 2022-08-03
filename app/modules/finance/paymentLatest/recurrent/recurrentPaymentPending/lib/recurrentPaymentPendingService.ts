import { RequestContract } from '@ioc:Adonis/Core/Request';
import { batchedPromises, transactLocalized } from 'app/services/utils';
import RecurrentPaymentChild from '../../recurrentPaymentChild/recurrentPaymentChild';
import RecurrentPaymentPending from '../recurrentPaymentPending';
import { RecurrentPaymentPendingVal } from './recurrentPaymentPendingVal';

const RecurrentPaymentPendingService = {
  findByPaymentChild: (paymentChildId: string) => {
    return RecurrentPaymentPending.query()
      .where('recurrent_payment_child_id', paymentChildId)
      .preload('grade')
      .preload('recurrentPaymentChild', (builder) => {
        builder.select('amount');
      })
      .preload('student');
  },

  createPending: async (request: RequestContract) => {
    const { payments } = await request.validate(RecurrentPaymentPendingVal);

    await transactLocalized(async (trx) => {
      for (const payment of payments) {
        const recurrentChild = await RecurrentPaymentChild.findByOrFail(
          'id',
          payment.recurrent_payment_child_id
        );

        await batchedPromises(
          payment.students,
          (item) =>
            RecurrentPaymentPending.create(
              {
                grade_id: item.grade_id,
                student_id: item.student_id,
                discount_amount: 0,
                recurrent_payment_id: recurrentChild.recurrent_payment_id,
                recurrent_payment_child_id: recurrentChild.id,
              },
              {
                client: trx,
              }
            ),
          10
        );
      }
    });
  },
};

export default RecurrentPaymentPendingService;
