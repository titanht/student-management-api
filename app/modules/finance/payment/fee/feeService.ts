import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { pickFields } from 'app/services/utils';
import Payment from '../payment';
import PaymentService from '../paymentService';
import Fee from './fee';
import FeeRepo from './feeRepo';

export default class FeeService extends Service<Fee> {
  protected paymentService: PaymentService;

  constructor() {
    super(new FeeRepo());
    this.paymentService = new PaymentService();
  }

  async create(createData: Partial<Fee>, auth?: AuthContract) {
    let data = {};

    // TODO: Transactify
    const payment = await this.paymentService.create(
      { ...(createData as Payment) },
      auth!
    );
    const fee = await this.repo.createModel({
      payment_id: payment.id,
      ...pickFields(createData, ['penalty', 'month', 'scholarship']),
    });
    data = { ...payment.serialize(), ...fee.serialize() };

    return data as Fee;
  }

  async update(id: string, editData: Partial<Fee>) {
    let data = {};

    const fee = await Fee.findOrFail(id);

    await this.paymentService.update(fee.payment_id, editData as Payment);
    const feeUpdate = await this.repo.updateModel(
      id,
      pickFields(editData, ['penalty', 'month', 'scholarship'])
    );
    data = {
      ...feeUpdate.serialize(),
    };

    return data as Fee;
  }
}
