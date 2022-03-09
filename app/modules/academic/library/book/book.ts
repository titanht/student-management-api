import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';

export default class Book extends Model {
  @column()
  public title: string;

  @column()
  public code: string;

  @column()
  public description: string;

  @column()
  public author: string;

  @column()
  public genre: string;

  @column.date()
  public year: DateTime;

  @column()
  public quantity: number;

  @column()
  public loaned_count: number;

  @column()
  public remark: string;
}
