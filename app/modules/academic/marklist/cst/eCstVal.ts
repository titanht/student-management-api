import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ECstVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    subject_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'subjects',
      }),
    ]),
    teacher_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'teachers',
      }),
    ]),
    academic_year_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
    count: schema.number.optional(),
  });
}
