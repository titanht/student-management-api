import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Payment from '../payment';

export default class Fee extends Model {
  @column()
  public month: string;

  @column()
  public payment_id: string;

  @column()
  public penalty: number;

  @column()
  public scholarship: number;

  @belongsTo(() => Payment, {
    foreignKey: 'payment_id',
  })
  public payment: BelongsTo<typeof Payment>;
}
