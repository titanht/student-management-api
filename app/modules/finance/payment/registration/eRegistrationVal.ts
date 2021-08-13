import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ERegistrationVal extends Validator {
  public schema = schema.create({
    payment_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'payments',
      }),
    ]),
  });
}
