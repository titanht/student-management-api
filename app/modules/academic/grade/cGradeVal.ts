import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { SubjectReportTemplate } from '../marklist/subject/subject';

export default class CGradeVal extends Validator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'grades', column: 'name' }),
    ]),
    monthly_fee: schema.number(),
    registration_fee: schema.number(),
    tutorial_fee: schema.number(),
    summer_fee: schema.number(),
    order: schema.number(),
    report_card_template: schema.enum(Object.values(SubjectReportTemplate)),
    skill_template: schema.enum(Object.values(SubjectReportTemplate)),
  });
}
