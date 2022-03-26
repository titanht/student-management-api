import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class PromoteGradeStudentVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    student_ids: schema.array([rules.required()]).members(
      schema.string({}, [
        rules.exists({
          column: 'id',
          table: 'students',
        }),
      ])
    ),
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
