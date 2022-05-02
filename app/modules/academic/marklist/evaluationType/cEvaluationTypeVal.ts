import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CEvaluationTypeVal extends Validator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        table: 'evaluation_types',
        column: 'name',
      }),
    ]),
    weight: schema.number([rules.gt(0)]),
  });
}
