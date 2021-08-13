import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Cst from '../../cst/cst';
import Rcq from '../rcq/rcq';

export default class RcqCst extends Model {
  @column()
  public cst_id: string;

  @column()
  public rcq_id: string;

  @column()
  public score: number;

  @belongsTo(() => Cst, {
    foreignKey: 'cst_id',
  })
  public cst: BelongsTo<typeof Cst>;

  @belongsTo(() => Rcq, {
    foreignKey: 'rcq_id',
  })
  public rcq: BelongsTo<typeof Rcq>;
}
