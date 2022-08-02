import { RequestContract } from '@ioc:Adonis/Core/Request';
import { transactLocalized } from 'app/services/utils';
import FixedPaymentPending from '../../fixedPaymentPending/fixedPaymentPending';
import FixedPaymentPendingService from '../../fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedPaymentService from '../../lib/fixedPaymentService';
import FixedStudentPayment from '../fixedStudentPayment';
import { FixedStudentPaymentVal } from './fixedStudentPaymentVal';

const FixedStudentPaymentService = {
  createPayment: async (request: RequestContract, userId: string) => {
    const {
      fixed_payment_pending_id,
      fs,
      attachment,
      cash,
      slip_date,
      remark,
    } = await request.validate(FixedStudentPaymentVal);

    const paymentPending = await FixedPaymentPendingService.findOne(
      fixed_payment_pending_id
    );
    const fixedPayment = await FixedPaymentService.findOne(
      paymentPending.fixed_payment_id
    );

    await transactLocalized(async (trx) => {
      await FixedStudentPayment.create(
        {
          fs,
          attachment,
          cash,
          slip_date,
          remark,
          fixed_payment_id: paymentPending.fixed_payment_id,
          discount: paymentPending.discount_amount,
          amount: fixedPayment.amount,
          penalty: 0,
          total: fixedPayment.amount,
          student_id: paymentPending.student_id,
          grade_id: paymentPending.grade_id,
          user_id: userId,
        },
        {
          client: trx,
        }
      );

      await FixedPaymentPending.query({ client: trx })
        .where('id', fixed_payment_pending_id)
        .delete();
    });
  },
};

export default FixedStudentPaymentService;
