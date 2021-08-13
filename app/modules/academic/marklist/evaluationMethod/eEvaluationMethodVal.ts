import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EEvaluationMethodVal extends Validator {
  public schema = schema.create({
    // TODO: Handle array
    evaluation_type_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'evaluation_types',
      }),
    ]),
    quarter_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'quarters',
      }),
    ]),
    cst_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'csts',
      }),
    ]),
  });
}
