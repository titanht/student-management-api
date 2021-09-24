import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';

export type ParsedAttendance = {
  in_begin: string;
  in_end: string;
  late_in: string;
  out_begin: string;
  out_end: string;
  early_out: string;
};

export type UserDateAttendance = Record<string, ParsedAttendance>;

export default class UserAttendance extends Model {
  @column.date()
  public date: DateTime;

  @column()
  public day_week: number;

  @column()
  public week_year: number;

  @column()
  public month: number;

  @column()
  public time_in: string;

  @column()
  public time_out: string;

  @column()
  public present_in: boolean;

  @column()
  public present_out: boolean;

  @column()
  public late_in: boolean;

  @column()
  public early_out: boolean;

  @column()
  public only_in: boolean;

  @column()
  public only_out: boolean;

  @column()
  public user_id: string;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;
}
