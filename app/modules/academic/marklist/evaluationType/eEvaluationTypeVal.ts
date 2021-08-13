import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EEvaluationTypeVal extends Validator {
  public schema = schema.create({
    name: schema.string.optional(),
    weight: schema.number.optional(),
  });
}
