import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EBookVal extends Validator {
  public schema = schema.create({
    title: schema.string.optional(),
    code: schema.string.optional(),
    description: schema.string.optional(),
    author: schema.string.optional(),
    genre: schema.string.optional(),
    year: schema.date.optional(),
    quantity: schema.number.optional(),
    loaned_count: schema.number.optional(),
    remark: schema.string.optional(),
  });
}
