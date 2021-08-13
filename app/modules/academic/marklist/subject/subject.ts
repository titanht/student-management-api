import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export default class Subject extends Model {
  @column()
  public subject: string;

  @column()
  public code: string;

  @column()
  public consider_for_rank: boolean;
}
