import ApiController from 'app/modules/_shared/apiController';
import StagePayment from './stagePayment';
import StagePaymentService from './stagePaymentService';
import CStagePaymentVal from './cStagePaymentVal';
import EStagePaymentVal from './eStagePaymentVal';

export default class StagePaymentController extends ApiController<StagePayment> {
  constructor(protected service = new StagePaymentService()) {
    super(service, {
      createValidator: CStagePaymentVal,
      editValidator: EStagePaymentVal,
    });
  }
}
