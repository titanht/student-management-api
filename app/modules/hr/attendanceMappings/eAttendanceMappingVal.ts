import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EAttendanceMappingVal extends Validator {
  public schema = schema.create({
    account_id: schema.string({}, [
      rules.unique({
        table: 'attendance_mappings',
        column: 'account_id',
      }),
    ]),
    attendance_setting_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'attendance_settings',
      }),
    ]),
  });
}
