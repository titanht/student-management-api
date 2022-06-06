import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { SubjectDisplay } from './subject';

export default class CSubjectVal extends Validator {
  public schema = schema.create({
    subject: schema.string({}, [
      rules.unique({ table: 'subjects', column: 'subject' }),
    ]),
    code: schema.string({}, [
      rules.unique({
        table: 'subjects',
        column: 'code',
      }),
    ]),
    consider_for_rank: schema.boolean(),
    order: schema.number(),
    display_mode: schema.enum(Object.values(SubjectDisplay)),
    show_on_report: schema.boolean(),
    report_card_template: schema.string(),
  });
}
