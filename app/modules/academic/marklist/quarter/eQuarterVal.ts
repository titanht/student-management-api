import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EQuarterVal extends Validator {
  public schema = schema.create({
    quarter: schema.number.optional([rules.unsigned()]),
    semester_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'semesters',
      }),
    ]),
  });
}
