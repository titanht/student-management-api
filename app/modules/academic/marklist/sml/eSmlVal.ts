import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ESmlVal extends Validator {
  public schema = schema.create({
    evaluation_method_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'evaluation_methods',
      }),
    ]),
    grade_student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'grade_students',
      }),
    ]),
    score: schema.number.optional(),
    finalized: schema.boolean.optional(),
    finalize_date: schema.date.optional(),
  });
}
