import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CRcyVal extends Validator {
  public schema = schema.create({
    academic_year_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
    ]),
    grade_student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grade_students',
      }),
    ]),
    total_score: schema.number(),
    average: schema.number(),
    subject_count: schema.number.optional(),
    rank: schema.number(),
    finalized: schema.boolean(),
    finalize_date: schema.date.optional(),
  });
}
