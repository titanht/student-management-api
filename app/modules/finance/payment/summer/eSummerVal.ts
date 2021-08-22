import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import EPaymentVal from '../ePaymentVal';

export default class ESummerVal extends Validator {
  public schema = schema.create({
    ...EPaymentVal.paymentRules,
    fee: schema.number.optional([rules.notSummerPaid()]),
  });
}
