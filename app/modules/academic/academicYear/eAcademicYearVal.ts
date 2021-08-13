import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EAcademicYearVal extends Validator {
  public schema = schema.create({
    year: schema.number.optional(),
  });
}
