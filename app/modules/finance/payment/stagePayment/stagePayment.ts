import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { PaymentType } from '../payment';

export default class StagePayment extends Model {
  @column()
  public data: string;

  @column()
  public type: PaymentType;
}
