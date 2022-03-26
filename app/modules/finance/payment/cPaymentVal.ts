import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CPaymentVal extends Validator {
  public static paymentRules = {
    fee: schema.number(),
    fs: schema.number(),
    attachment: schema.number(),
    cash: schema.number.optional(),
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
    hidden: schema.boolean.optional(),
    slip_date: schema.date.optional(),
    remark: schema.string.optional(),
  };
}
