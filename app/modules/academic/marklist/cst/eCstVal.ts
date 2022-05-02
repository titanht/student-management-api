import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ECstVal extends Validator {
  public schema = schema.create({
    teacher_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'teachers',
      }),
    ]),
    count: schema.number.optional([rules.gt(0)]),
  });
}
