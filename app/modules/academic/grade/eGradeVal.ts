import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { SubjectReportTemplate } from '../marklist/subject/subject';

export default class EGradeVal extends Validator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.unique({
        table: 'grades',
        column: 'name',
        whereNot: {
          id: this.ctx.params.id,
        },
      }),
    ]),
    monthly_fee: schema.number.optional(),
    registration_fee: schema.number.optional(),
    tutorial_fee: schema.number.optional(),
    summer_fee: schema.number.optional(),
    order: schema.number(),
    report_card_template: schema.enum.optional(
      Object.values(SubjectReportTemplate)
    ),
  });
}
