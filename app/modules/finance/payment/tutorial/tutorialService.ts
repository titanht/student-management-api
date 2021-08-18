import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { pickFields } from 'app/services/utils';
import Payment, { PaymentType } from '../payment';
import PaymentService from '../paymentService';
import Tutorial from './tutorial';
import TutorialRepo from './tutorialRepo';

export default class TutorialService extends Service<Tutorial> {
  protected paymentService: PaymentService;

  constructor() {
    super(new TutorialRepo());
    this.paymentService = new PaymentService();
  }

  async create(createData: Partial<Tutorial>, auth: AuthContract) {
    let data = {};

    const payment = await this.paymentService.create(
      {
        ...(createData as unknown as Payment),
        payment_type: PaymentType.Tutorial,
      },
      auth
    );
    const fee = await this.repo.createModel({
      payment_id: payment.id,
      ...pickFields(createData, ['month']),
    });
    data = { ...payment.serialize(), ...fee.serialize() };

    return data as Tutorial;
  }

  async update(id: string, editData: Partial<Tutorial>) {
    let data = {};

    const fee = await Tutorial.findOrFail(id);

    await this.paymentService.update(
      fee.payment_id,
      editData as unknown as Payment
    );
    const feeUpdate = await this.repo.updateModel(
      id,
      pickFields(editData, ['month'])
    );
    data = {
      ...feeUpdate.serialize(),
    };

    return data as Tutorial;
  }
}
