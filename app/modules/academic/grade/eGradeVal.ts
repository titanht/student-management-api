import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EGradeVal extends Validator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.unique({
        table: 'grades',
        column: 'name',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    monthly_fee: schema.number.optional(),
    registration_fee: schema.number.optional(),
    tutorial_fee: schema.number.optional(),
    summer_fee: schema.number.optional(),
  });
}
