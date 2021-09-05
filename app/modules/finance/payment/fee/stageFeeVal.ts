import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';
import { Months, PaymentType } from '../payment';

export default class StageFeeVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    penalty: schema.number.optional(),
    scholarship: schema.number.optional(),
    month: schema.enum(Object.values(Months), [
      rules.monthFeeNotPaid(),
      rules.paymentNotStaged({ paymentType: PaymentType.Fee, addMonth: true }),
    ]),
  });
}
