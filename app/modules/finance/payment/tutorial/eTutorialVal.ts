import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import EPaymentVal from '../ePaymentVal';
import { Months } from '../payment';

export default class ETutorialVal extends Validator {
  public schema = schema.create({
    ...EPaymentVal.paymentRules,
    month: schema.enum.optional(Object.values(Months), [
      rules.monthTutorialNotPaid(),
    ]),
  });
}
