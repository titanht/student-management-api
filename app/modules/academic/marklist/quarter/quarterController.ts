import ApiController from 'app/modules/_shared/apiController';
import Quarter from './quarter';
import QuarterService from './quarterService';
import CQuarterVal from './cQuarterVal';
import EQuarterVal from './eQuarterVal';

export default class QuarterController extends ApiController<Quarter> {
  constructor(protected service = new QuarterService()) {
    super(service, {
      createValidator: CQuarterVal,
      editValidator: EQuarterVal,
    });
  }
}
