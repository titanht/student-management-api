import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { LifeCondition } from 'app/modules/_shared/types';
import Validator from 'app/modules/_shared/validator';
import { HealthTypes, SchoolLeaveReason } from './studentProfile';

export default class EStudentProfileVal extends Validator {
  public schema = schema.create({
    first_name: schema.string.optional(),
    nationality: schema.string.optional(),
    address_city: schema.string.optional(),
    address_sub_city: schema.string.optional(),
    address_woreda: schema.string.optional(),
    house_number: schema.string.optional(),
    student_phone_number: schema.string.optional(),
    other_health_status: schema.string.optional(),
    previous_school_name: schema.string.optional(),
    previous_school_city: schema.string.optional(),
    previous_school_sub_city: schema.string.optional(),
    previous_school_woreda: schema.string.optional(),
    school_leave_other: schema.string.optional(),
    entry_class: schema.string.optional(),
    parent_name: schema.string.optional(),
    occupation: schema.string.optional(),
    work_place: schema.string.optional(),
    parent_phone_number: schema.string.optional(),
    student_living_with: schema.string.optional(),
    date_of_birth: schema.date.optional(),
    student_photo: schema.string.optional(),
    parent_photo: schema.file.optional(),
    emergencies: schema.string.optional(),
    student_id: schema.string.optional({}, [
      rules.exists({
        column: 'id',
        table: 'students',
      }),
    ]),
    health_status: schema.enum.optional(Object.values(HealthTypes)),
    previous_school_leave_reason: schema.enum.optional(
      Object.values(SchoolLeaveReason)
    ),
    father_condition: schema.enum.optional(Object.values(LifeCondition)),
    mother_condition: schema.enum.optional(Object.values(LifeCondition)),
  });
}
