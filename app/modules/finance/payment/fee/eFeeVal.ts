import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import EPaymentVal from '../ePaymentVal';
import { Months } from '../payment';

export default class EFeeVal extends Validator {
  public schema = schema.create({
    ...EPaymentVal.paymentRules,
    month: schema.enum.optional(Object.values(Months)),
    penalty: schema.number.optional(),
    scholarship: schema.number.optional(),
  });
}
