import { DateTime } from 'luxon';
import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from '../_shared/model';

export default class LastOp extends Model {
  @column()
  public last_log: DateTime;
}
