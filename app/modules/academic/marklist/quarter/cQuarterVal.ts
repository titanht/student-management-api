import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CQuarterVal extends Validator {
  public schema = schema.create({
    quarter: schema.number([
      rules.unsigned(),
      rules.unique({ table: 'quarters', column: 'quarter' }),
    ]),
    semester_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'semesters',
      }),
    ]),
  });
}
