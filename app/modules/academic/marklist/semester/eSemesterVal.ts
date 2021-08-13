import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ESemesterVal extends Validator {
  public schema = schema.create({
    semester: schema.number.optional([rules.unsigned()]),
  });
}
