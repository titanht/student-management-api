import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';

export default class CSummerVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
      rules.notSummerPaid(),
    ]),
  });
}
