import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CGradeStudentVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
      rules.unique({
        table: 'grade_students',
        column: 'student_id',
        where: {
          academic_year_id: this.body.academic_year_id,
        },
      }),
    ]),
    academic_year_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
  });

  public messages = {
    ...this.messages,
    'student_id.unique': 'Student already assigned grade for year',
  };
}
