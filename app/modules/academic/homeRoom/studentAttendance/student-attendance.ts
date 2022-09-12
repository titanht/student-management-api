import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
import AcademicYear from '../../academicYear/academicYear';
import Student from 'app/modules/academic/student/student';

export enum AttendanceTypes {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  Permission = 'Permission',
}

export default class StudentAttendance extends Model {
  @column()
  public student_id: string;

  @column()
  public user_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public status: AttendanceTypes;

  @column.date()
  public date: DateTime;

  @column()
  public late_reason: string;

  @column()
  public msg_sent: boolean;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;
}
