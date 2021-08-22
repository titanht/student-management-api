import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Service from 'app/modules/_shared/service';
import { pickFields, transactLocalized } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import { StageExtra } from '../stagePayment/stagePaymentService';
import Tutorial from './tutorial';
import TutorialRepo from './tutorialRepo';

export interface TutorialData extends Tutorial, Payment {}
export default class TutorialService extends Service<Tutorial> {
  protected paymentService: PaymentService;

  constructor() {
    super(new TutorialRepo());
    this.paymentService = new PaymentService();
  }

  async stage(createData: TutorialData) {
    return this.paymentService.stagePayment(createData, PaymentType.Tutorial);
  }

  async create(createData: Partial<TutorialData>, auth: AuthContract) {
    let data = {};

    await transactLocalized(async (trx) => {
      const payment = await this.paymentService.createTrx(
        trx,
        { ...createData, payment_type: PaymentType.Tutorial },
        auth
      );
      const tutorial = await this.repo.createModelTrx(trx, {
        payment_id: payment.id,
        ...pickFields(createData, ['month']),
      });
      data = { ...payment.serialize(), ...tutorial.serialize() };
    });

    return data as Tutorial;
  }

  async stageTrx(
    trx: TransactionClientContract,
    createData: Partial<TutorialData>,
    auth: AuthContract,
    extra: StageExtra
  ) {
    let data = {};

    const payment = await this.paymentService.createTrx(
      trx,
      { ...createData, payment_type: PaymentType.Tutorial },
      auth,
      extra
    );
    const tutorial = await this.repo.createModelTrx(trx, {
      payment_id: payment.id,
      ...pickFields(createData, ['month']),
    });
    data = { ...payment.serialize(), ...tutorial.serialize() };

    return data as Tutorial;
  }

  async update(id: string, editData: Partial<TutorialData>) {
    let data = {};

    const tutorial = await Tutorial.findOrFail(id);

    await transactLocalized(async (trx) => {
      await this.paymentService.updateTrx(trx, tutorial.payment_id, editData);
      const tutUpdate = await this.repo.updateModelTrx(
        trx,
        id,
        pickFields(editData, ['month'])
      );
      data = {
        ...tutUpdate.serialize(),
      };
    });

    return data as Tutorial;
  }
}
