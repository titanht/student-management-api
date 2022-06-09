import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { SubjectDisplay } from './subject';

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
    order: schema.number.optional(),
    display_mode: schema.enum.optional(Object.values(SubjectDisplay)),
    show_on_report: schema.boolean.optional(),
    report_card_template: schema.string.optional(),
  });
}
