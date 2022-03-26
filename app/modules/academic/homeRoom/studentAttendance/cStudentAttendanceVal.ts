import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { AttendanceTypes } from './studentAttendance';

export default class CStudentAttendanceVal extends Validator {
  public schema = schema.create({
    student_ids: schema.array([rules.distinct('*')]).members(
      schema.string({}, [
        rules.exists({
          column: 'id',
          table: 'students',
        }),
      ])
    ),
    statuses: schema
      .array()
      .members(schema.enum(Object.values(AttendanceTypes))),
    late_reasons: schema.array().members(schema.string.optional()),
    date: schema.date(),
  });
}
