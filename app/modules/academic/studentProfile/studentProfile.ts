import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { LifeCondition } from 'app/modules/_shared/types';
import { DateTime } from 'luxon';
import Student from '../student/student';

export enum HealthTypes {
  FullyHealthy = 'FULLY_HEALTHY',
  Paraplegic = 'PARAPLEGIC',
  Other = 'OTHER',
}

export enum SchoolLeaveReason {
  Transfer = 'TRANSFER',
  DisciplineIssue = 'DISCIPLINE_ISSUE',
  Other = 'Other',
}

export default class StudentProfile extends Model {
  @column()
  public nationality: string;

  @column()
  public address_city: string;

  @column()
  public address_sub_city: string;

  @column()
  public address_woreda: string;

  @column()
  public house_number: string;

  @column()
  public student_phone_number: string;

  @column()
  public other_health_status: string;

  @column()
  public previous_school_name: string;

  @column()
  public previous_school_city: string;

  @column()
  public previous_school_sub_city: string;

  @column()
  public previous_school_woreda: string;

  @column()
  public school_leave_other: string;

  @column()
  public entry_class: string;

  @column()
  public parent_name: string;

  @column()
  public occupation: string;

  @column()
  public work_place: string;

  @column()
  public parent_phone_number: string;

  @column()
  public student_living_with: string;

  @column.date()
  public date_of_birth: DateTime;

  @column()
  public student_photo: string;

  @column()
  public parent_photo: string | null;

  @column()
  public emergencies: string;

  @column()
  public student_id: string;

  @column()
  public health_status: HealthTypes;

  @column()
  public previous_school_leave_reason: SchoolLeaveReason;

  @column()
  public father_condition: LifeCondition;

  @column()
  public mother_condition: LifeCondition;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;
}
