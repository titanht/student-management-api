import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class ESubjectVal extends Validator {
  public schema = schema.create({
    subject: schema.string.optional({}, [
      rules.unique({
        table: 'subjects',
        column: 'subject',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    code: schema.string.optional({}, [
      rules.unique({
        table: 'subjects',
        column: 'code',
        whereNot: {
          id: this.ctx.request.params().id,
        },
      }),
    ]),
    consider_for_rank: schema.boolean.optional(),
  });
}
