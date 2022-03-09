import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CBookVal extends Validator {
  public schema = schema.create({
    title: schema.string(),
    code: schema.string({}, [rules.unique({ table: 'books', column: 'code' })]),
    description: schema.string(),
    author: schema.string(),
    genre: schema.string(),
    year: schema.date(),
    quantity: schema.number(),
    loaned_count: schema.number.optional(),
    remark: schema.string.optional(),
  });
}
