import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export default class EvaluationType extends Model {
  @column()
  public name: string;

  @column()
  public weight: number;
}
