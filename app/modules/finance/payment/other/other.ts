import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Payment from '../payment';

export default class Other extends Model {
  @column()
  public reason: string;

  @column()
  public payment_id: string;

  @belongsTo(() => Payment, {
    foreignKey: 'payment_id',
  })
  public payment: BelongsTo<typeof Payment>;
}
