import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';
import { PaymentType } from '../payment';

export default class StageRegistrationVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
      rules.notRegistered({
        message: 'student already registered for current year',
      }),
      rules.paymentNotStaged({
        paymentType: PaymentType.Registration,
        addMonth: false,
      }),
    ]),
  });
}
