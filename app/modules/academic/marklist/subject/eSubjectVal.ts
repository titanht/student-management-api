import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ESubjectVal extends Validator {
  public schema = schema.create({
    subject: schema.string.optional(),
    code: schema.string.optional(),
    consider_for_rank: schema.boolean.optional(),
  });
}
