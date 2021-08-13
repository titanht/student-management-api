import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Payment from '../payment';

export default class Registration extends Payment {
  @column()
  public payment_id: string;

  @belongsTo(() => Payment, {
    foreignKey: 'payment_id',
  })
  public payment: BelongsTo<typeof Payment>;
}
