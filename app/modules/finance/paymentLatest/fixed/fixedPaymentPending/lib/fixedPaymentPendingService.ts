import { RequestContract } from '@ioc:Adonis/Core/Request';
import { batchedPromises, transactLocalized } from 'app/services/utils';
import FixedPaymentPending from '../fixedPaymentPending';
import { FixedPaymentPendingVal } from './fixedPaymentPendingVal';

const FixedPaymentPendingService = {
  findOne: (id: string) => {
    return FixedPaymentPending.findByOrFail('id', id);
  },

  createPending: async (request: RequestContract) => {
    const { students, fixed_payment_id } = await request.validate(
      FixedPaymentPendingVal
    );

    await transactLocalized(async (trx) => {
      await batchedPromises(students, (student) =>
        FixedPaymentPending.updateOrCreate(
          {
            student_id: student.student_id,
            grade_id: student.grade_id,
            fixed_payment_id: fixed_payment_id,
          },
          {
            student_id: student.student_id,
            grade_id: student.grade_id,
            fixed_payment_id: fixed_payment_id,
            discount_amount: 0,
          },
          {
            client: trx,
          }
        )
      );
    });
  },
};

export default FixedPaymentPendingService;
