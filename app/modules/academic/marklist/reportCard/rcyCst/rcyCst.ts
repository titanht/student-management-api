import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Cst from '../../cst/cst';
import Rcy from '../rcy/rcy';

export default class RcyCst extends Model {
  @column()
  public cst_id: string;

  @column()
  public rcy_id: string;

  @column()
  public score: number;

  @belongsTo(() => Cst, {
    foreignKey: 'cst_id',
  })
  public cst: BelongsTo<typeof Cst>;

  @belongsTo(() => Rcy, {
    foreignKey: 'rcy_id',
  })
  public rcy: BelongsTo<typeof Rcy>;
}
