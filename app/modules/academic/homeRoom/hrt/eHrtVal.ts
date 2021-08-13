import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EHrtVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    user_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
  });
}
