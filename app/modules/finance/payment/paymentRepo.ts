import { Repo } from 'app/modules/_shared/repo';
import Payment from './payment';

export default class PaymentRepo extends Repo<Payment> {
  constructor() {
    super(Payment);
  }

  async getAttachmentNumber(): Promise<number> {
    const payment = await Payment.query().orderBy('attachment', 'desc').first();

    return payment === null ? 1 : payment.attachment + 1;
  }
}
