import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CUserAttendanceVal extends Validator {
  public schema = schema.create({
    date: schema.date(),
    day_week: schema.number.optional(),
    week_year: schema.number.optional(),
    month: schema.number.optional(),
    time_in: schema.string.optional(),
    time_out: schema.string.optional(),
    present_in: schema.boolean.optional(),
    present_out: schema.boolean.optional(),
    late_in: schema.boolean.optional(),
    early_out: schema.boolean.optional(),
    only_in: schema.boolean.optional(),
    only_out: schema.boolean.optional(),
    user_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
  });
}
