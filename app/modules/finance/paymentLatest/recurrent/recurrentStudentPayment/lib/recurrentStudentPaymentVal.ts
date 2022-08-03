import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class RecurrentStudentPaymentVal extends Validator {
  public schema = schema.create({
    attachment: schema.number(),
    fs: schema.string(),
    cash: schema.number.optional(),
    recurrent_payment_pending_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'recurrent_payment_pendings',
      }),
    ]),
    slip_date: schema.date.optional(),
    remark: schema.string.optional(),
  });
}
