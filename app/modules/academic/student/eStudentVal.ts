import { schema } from '@ioc:Adonis/Core/Validator';
import { Gender } from 'app/modules/_shared/types';
import Validator from 'app/modules/_shared/validator';

export default class EStudentVal extends Validator {
  public schema = schema.create({
    first_name: schema.string.optional(),
    father_name: schema.string.optional(),
    gender: schema.enum.optional(Object.values(Gender)),
    grand_father_name: schema.string.optional(),
    id_number: schema.string.optional(),
    primary_phone: schema.string.optional(),
    img: schema.string.optional(),
    scholarship_amount: schema.number.optional(),
    age: schema.number.optional(),
    date_of_birth: schema.date.optional(),
  });
}
