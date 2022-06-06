import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CRegistrationPaymentVal extends Validator {
  public schema = schema.create({
    fee: schema.number(),
    attachment: schema.number(),
    fs: schema.number(),
    cash: schema.number.optional(),
    user_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
      rules.notRegisteredPayment({
        message: 'already registered for current year',
      }),
    ]),
    academic_year_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
    hidden: schema.boolean.optional(),
    slip_date: schema.date.optional(),
    remark: schema.string.optional(),
  });
}
