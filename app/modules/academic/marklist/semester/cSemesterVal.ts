import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CSemesterVal extends Validator {
  public schema = schema.create({
    semester: schema.number([
      rules.unsigned(),
      rules.unique({ table: 'semesters', column: 'semester' }),
    ]),
  });
}
