import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';
import { Months } from '../payment';

export default class CFeeVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    month: schema.enum(Object.values(Months)),
    penalty: schema.number.optional(),
    scholarship: schema.number.optional(),
  });
}
