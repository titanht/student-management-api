import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Service from 'app/modules/_shared/service';
import { pickFields, transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import { StageExtra } from '../stagePayment/stagePaymentService';
import Fee from './fee';
import FeeRepo from './feeRepo';

export interface FeeData extends Fee, Payment {}

export default class FeeService extends Service<Fee> {
  protected paymentService: PaymentService;

  constructor() {
    super(new FeeRepo());
    this.paymentService = new PaymentService();
  }

  async stage(createData: FeeData) {
    return this.paymentService.stagePayment(createData, PaymentType.Fee);
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

  async stageTrx(
    trx: TransactionClientContract,
    createData: FeeData,
    auth: AuthContract,
    extra: StageExtra
  ) {
    let data = {};

    const payment = await this.paymentService.createTrx(
      trx,
      { ...createData, payment_type: PaymentType.Fee },
      auth,
      extra
    );
    const fee = await this.repo.createModelTrx(trx, {
      payment_id: payment.id,
      ...pickFields(createData, ['penalty', 'month', 'scholarship']),
    });
    data = { ...payment.serialize(), ...fee.serialize() };

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
