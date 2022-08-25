import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { Gender } from 'app/modules/_shared/types';
import Validator from 'app/modules/_shared/validator';

export default class CStudentVal extends Validator {
  public schema = schema.create({
    first_name: schema.string(),
    father_name: schema.string(),
    gender: schema.enum(Object.values(Gender)),
    grand_father_name: schema.string.optional(),
    primary_phone: schema.string.optional(),
    scholarship_amount: schema.number.optional(),
    age: schema.number.optional(),
    date_of_birth: schema.date({
      format: 'yyyy-MM-dd',
    }),
    grade_id: schema.string({}, [
      rules.exists({
        table: 'grades',
        column: 'id',
      }),
    ]),
    img: schema.file.optional(),
  });
}
