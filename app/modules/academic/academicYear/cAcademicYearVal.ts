import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CAcademicYearVal extends Validator {
  public schema = schema.create({
    year: schema.number([
      rules.unique({ table: 'academic_years', column: 'year' }),
    ]),
  });
}
