import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';

export default class COtherVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    reason: schema.string(),
  });
}
