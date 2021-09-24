import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CAttendanceMappingVal extends Validator {
  public schema = schema.create({
    account_id: schema.string({}, [
      rules.unique({
        table: 'attendance_mappings',
        column: 'account_id',
      }),
    ]),
    attendance_setting_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'attendance_settings',
      }),
    ]),
    user_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'users',
      }),
      rules.unique({
        table: 'attendance_mappings',
        column: 'user_id',
      }),
    ]),
  });
}
