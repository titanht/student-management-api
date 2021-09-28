import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CUserAttendanceVal extends Validator {
  public schema = schema.create({
    attendance_file: schema.file({}),
  });
}
