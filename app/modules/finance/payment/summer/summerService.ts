import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import Summer from './summer';
import SummerRepo from './summerRepo';

export interface SummerData extends Summer, Payment {}

export default class SummerService extends Service<Summer> {
  protected paymentService: PaymentService;

  constructor() {
    super(new SummerRepo());
    this.paymentService = new PaymentService();
  }

  async create(createData: Partial<SummerData>, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Summer },
        auth
      );
      const reg = await this.repo.createModelTrx(trx, {
        payment_id: payment.id,
      });
      data = {
        ...payment.serialize(),
        ...reg.serialize(),
      };
    });

    return data as Summer;
  }

  async update(id: string, editData: Partial<SummerData>) {
    const fee = await Summer.findOrFail(id);
    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, fee.payment_id, editData);
    });

    return fee.serialize() as Summer;
  }
}
