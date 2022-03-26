import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export default class AttendanceSetting extends Model {
  @column()
  public in_begin: string;

  @column()
  public in_end: string;

  @column()
  public late_in: string;

  @column()
  public out_begin: string;

  @column()
  public out_end: string;

  @column()
  public early_out: string;

  @column()
  public title: string;
}
