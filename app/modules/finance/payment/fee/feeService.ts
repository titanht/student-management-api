import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { pickFields, transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import Fee from './fee';
import FeeRepo from './feeRepo';

export interface FeeData extends Fee, Payment {}

export default class FeeService extends Service<Fee> {
  protected paymentService: PaymentService;

  constructor() {
    super(new FeeRepo());
    this.paymentService = new PaymentService();
  }

  async create(createData: FeeData, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Fee },
        auth
      );
      const fee = await this.repo.createModelTrx(trx, {
        payment_id: payment.id,
        ...pickFields(createData, ['penalty', 'month', 'scholarship']),
      });
      data = { ...payment.serialize(), ...fee.serialize() };
    });

    return data as Fee;
  }

  async update(id: string, editData: Partial<FeeData>) {
    let data = {};

    const fee = await Fee.findOrFail(id);

    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, fee.payment_id, editData);
      const feeUpdate = await this.repo.updateModelTrx(
        trx,
        id,
        pickFields(editData, ['penalty', 'month', 'scholarship'])
      );
      data = {
        ...feeUpdate.serialize(),
      };
    });

    return data as Fee;
  }
}
