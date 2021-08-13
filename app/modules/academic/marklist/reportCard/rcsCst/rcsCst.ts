import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Cst from '../../cst/cst';
import Rcs from '../rcs/rcs';

export default class RcsCst extends Model {
  @column()
  public cst_id: string;

  @column()
  public rcs_id: string;

  @column()
  public score: number;

  @belongsTo(() => Cst, {
    foreignKey: 'cst_id',
  })
  public cst: BelongsTo<typeof Cst>;

  @belongsTo(() => Rcs, {
    foreignKey: 'rcs_id',
  })
  public rcs: BelongsTo<typeof Rcs>;
}
