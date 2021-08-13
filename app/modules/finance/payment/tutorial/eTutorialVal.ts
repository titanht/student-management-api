import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { Months } from '../payment';

export default class ETutorialVal extends Validator {
  public schema = schema.create({
    month: schema.enum(Object.values(Months)),
  });
}
