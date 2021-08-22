import ApiController from 'app/modules/_shared/apiController';
import Summer from './summer';
import SummerService from './summerService';
import CSummerVal from './cSummerVal';
import ESummerVal from './eSummerVal';

export default class SummerController extends ApiController<Summer> {
  constructor(protected service = new SummerService()) {
    super(service, {
      createValidator: CSummerVal,
      editValidator: ESummerVal,
    });
  }
}
