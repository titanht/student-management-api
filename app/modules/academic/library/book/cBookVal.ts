import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CBookVal extends Validator {
  public schema = schema.create({
    title: schema.string(),
    code: schema.string({}, [rules.unique({ table: 'books', column: 'code' })]),
    quantity: schema.number(),
    year: schema.date(),
    description: schema.string.optional(),
    author: schema.string.optional(),
    genre: schema.string.optional(),
    loaned_count: schema.number.optional(),
    remark: schema.string.optional(),
    price: schema.number.optional(),
    publisher: schema.string.optional(),
    isbn: schema.string.optional(),
    img: schema.file.optional(),
  });
}
