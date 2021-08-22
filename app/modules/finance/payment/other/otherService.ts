import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Service from 'app/modules/_shared/service';
import { pickFields, transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import { StageExtra } from '../stagePayment/stagePaymentService';
import Other from './other';
import OtherRepo from './otherRepo';

export interface OtherData extends Other, Payment {}

export default class OtherService extends Service<Other> {
  protected paymentService: PaymentService;

  constructor() {
    super(new OtherRepo());
    this.paymentService = new PaymentService();
  }

  async stage(createData: OtherData) {
    return this.paymentService.stagePayment(createData, PaymentType.Other);
  }

  async create(createData: OtherData, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Other },
        auth
      );
      const other = await this.repo.createModelTrx(trx, {
        payment_id: payment.id,
        ...pickFields(createData, ['reason']),
      });
      data = { ...payment.serialize(), ...other.serialize() };
    });

    return data as Other;
  }

  async stageTrx(
    trx: TransactionClientContract,
    createData: OtherData,
    auth: AuthContract,
    extra: StageExtra
  ) {
    let data = {};

    const payment = await this.paymentService.createTrx(
      trx,
      { ...createData, payment_type: PaymentType.Other },
      auth,
      extra
    );
    const other = await this.repo.createModelTrx(trx, {
      payment_id: payment.id,
      ...pickFields(createData, ['reason']),
    });
    data = { ...payment.serialize(), ...other.serialize() };

    return data as Other;
  }

  async update(id: string, editData: Partial<OtherData>) {
    let data = {};

    const other = await Other.findOrFail(id);

    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, other.payment_id, editData);
      const otherUpdate = await this.repo.updateModelTrx(
        trx,
        id,
        pickFields(editData, ['reason'])
      );
      data = {
        ...otherUpdate.serialize(),
      };
    });

    return data as Other;
  }
}
