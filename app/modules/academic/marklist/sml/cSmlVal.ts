import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CSmlVal extends Validator {
  public schema = schema.create({
    evaluation_method_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'evaluation_methods',
      }),
      // rules.unique({
      //   table: 'smls',
      //   column: 'evaluation_method_id',
      //   where: {
      //     grade_student_id: this.body.grade_student_id,
      //   },
      // }),
    ]),
    grade_student_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grade_students',
      }),
    ]),
    score: schema.number(),
    finalized: schema.boolean(),
    finalize_date: schema.date.optional(),
  });

  public messages = {
    ...this.messages,
    'evaluation_method_id.unique':
      'score already inserted for evaluation method',
  };
}
