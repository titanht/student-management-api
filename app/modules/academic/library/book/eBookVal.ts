import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EBookVal extends Validator {
  public schema = schema.create({
    title: schema.string.optional(),
    code: schema.string.optional({}, [
      rules.unique({
        table: 'books',
        column: 'code',
        whereNot: { id: this.ctx.request.params().id },
      }),
    ]),
    description: schema.string.optional(),
    author: schema.string.optional(),
    genre: schema.string.optional(),
    year: schema.date.optional(),
    quantity: schema.number.optional(),
    loaned_count: schema.number.optional(),
    remark: schema.string.optional(),
    price: schema.number.optional(),
    publisher: schema.string.optional(),
    isbn: schema.string.optional(),
  });
}
