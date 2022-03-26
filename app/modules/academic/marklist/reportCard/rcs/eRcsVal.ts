import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ERcsVal extends Validator {
  public schema = schema.create({
    semester_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'semesters',
      }),
    ]),
    grade_student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'grade_students',
      }),
    ]),
    total_score: schema.number.optional(),
    average: schema.number.optional(),
    subject_count: schema.number.optional(),
    rank: schema.number.optional(),
    finalized: schema.boolean.optional(),
    finalize_date: schema.date.optional(),
  });
}
