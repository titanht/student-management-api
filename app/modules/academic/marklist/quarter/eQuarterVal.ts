import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EQuarterVal extends Validator {
  public schema = schema.create({
    quarter: schema.number.optional([
      rules.unsigned(),
      rules.unique({
        table: 'quarters',
        column: 'quarter',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    semester_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'semesters',
      }),
    ]),
  });
}
