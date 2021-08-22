import { Repo } from 'app/modules/_shared/repo';
import { getQueryCount } from 'app/services/utils';
import { PaymentType } from '../payment';
import StagePayment from './stagePayment';

export default class StagePaymentRepo extends Repo<StagePayment> {
  constructor() {
    super(StagePayment);
  }

  async getStageCount(type: PaymentType) {
    return getQueryCount(StagePayment.query().where('type', type));
  }

  async removeAll() {
    await StagePayment.query().delete();
  }
}
