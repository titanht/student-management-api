import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EStagePaymentVal extends Validator {
  public schema = schema.create({});
}
