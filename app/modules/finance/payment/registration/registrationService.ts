import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Service from 'app/modules/_shared/service';
import { transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import { StageExtra } from '../stagePayment/stagePaymentService';
import Registration from './registration';
import RegistrationRepo from './registrationRepo';

export interface RegistrationData extends Registration, Payment {}

export default class RegistrationService extends Service<Registration> {
  protected paymentService: PaymentService;

  constructor() {
    super(new RegistrationRepo());
    this.paymentService = new PaymentService();
  }

  async stage(createData: RegistrationData) {
    return this.paymentService.stagePayment(
      createData,
      PaymentType.Registration
    );
  }

  async create(createData: Partial<RegistrationData>, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Registration },
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

    return data as Registration;
  }

  async stageTrx(
    trx: TransactionClientContract,
    createData: Partial<RegistrationData>,
    auth: AuthContract,
    extra: StageExtra
  ) {
    let data = {};

    const payment = await this.paymentService.createTrx(
      trx,
      { ...createData, payment_type: PaymentType.Registration },
      auth,
      extra
    );
    const reg = await this.repo.createModelTrx(trx, {
      payment_id: payment.id,
    });
    data = {
      ...payment.serialize(),
      ...reg.serialize(),
    };

    return data as Registration;
  }

  async update(id: string, editData: Partial<RegistrationData>) {
    const fee = await Registration.findOrFail(id);
    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, fee.payment_id, editData);
    });

    return fee.serialize() as Registration;
  }
}
