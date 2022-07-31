import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import FixedPayment from '../fixedPayment';

export default class FixedPaymentPending extends Model {
  @column()
  public discount_amount: number;

  @column()
  public fixed_payment_id: string;

  @column()
  public grade_id: string;

  @column()
  public student_id: string;

  @belongsTo(() => FixedPayment, {
    foreignKey: 'fixed_payment_id',
  })
  public fixedPayment: BelongsTo<typeof FixedPayment>;
}
