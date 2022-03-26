import { Repo } from 'app/modules/_shared/repo';
import Payment from './payment';

export default class PaymentRepo extends Repo<Payment> {
  constructor() {
    super(Payment);
  }
}
