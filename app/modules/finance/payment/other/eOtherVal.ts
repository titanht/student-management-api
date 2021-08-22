import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import EPaymentVal from '../ePaymentVal';

export default class EOtherVal extends Validator {
  public schema = schema.create({
    ...EPaymentVal.paymentRules,
    reason: schema.string.optional(),
  });
}
