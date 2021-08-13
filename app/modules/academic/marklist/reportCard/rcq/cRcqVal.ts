import {
  schema,
  // rules
} from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CRcqVal extends Validator {
  public schema = schema.create({
    // quarter_id: schema.string({}, [
    //   rules.exists({
    //     column: 'id',
    //     table: 'quarters',
    //   }),
    // ]),
    // grade_student_id: schema.string({}, [
    //   rules.exists({
    //     column: 'id',
    //     table: 'grade_students',
    //   }),
    // ]),
    // total_score: schema.number(),
    // average: schema.number(),
    // subject_count: schema.number.optional(),
    // rank: schema.number(),
    // finalized: schema.boolean(),
    // finalize_date: schema.date.optional(),
  });
}
