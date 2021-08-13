import ApiController from 'app/modules/_shared/apiController';
import Fee from './fee';
import FeeService from './feeService';
import CFeeVal from './cFeeVal';
import EFeeVal from './eFeeVal';

export default class FeeController extends ApiController<Fee> {
  constructor(protected service = new FeeService()) {
    super(service, {
      createValidator: CFeeVal,
      editValidator: EFeeVal,
    });
  }
}
