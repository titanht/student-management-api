import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EStudentAttendanceVal extends Validator {
  public schema = schema.create({
    student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
    user_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
    ]),
    academic_year_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
    status: schema.enum.optional(),
    date: schema.undefined.optional(),
    late_reason: schema.string.optional(),
  });
}
