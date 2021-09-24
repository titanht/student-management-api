import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import AttendanceSetting from '../attendanceSettings/attendanceSetting';

export default class AttendanceMapping extends Model {
  @column()
  public account_id: string;

  @column()
  public attendance_setting_id: string;

  @column()
  public user_id: string;

  @belongsTo(() => AttendanceSetting, {
    foreignKey: 'attendance_setting_id',
  })
  public attendanceSetting: BelongsTo<typeof AttendanceSetting>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;
}
