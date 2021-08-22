import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CStagePaymentVal extends Validator {
  public schema = schema.create({
    data: schema.string(),
    type: schema.enum(),
  });
}
