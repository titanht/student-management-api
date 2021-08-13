import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EGradeStudentVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
    academic_year_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
  });
}
