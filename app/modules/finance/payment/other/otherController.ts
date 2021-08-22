import ApiController from 'app/modules/_shared/apiController';
import Other from './other';
import OtherService from './otherService';
import COtherVal from './cOtherVal';
import EOtherVal from './eOtherVal';

export default class OtherController extends ApiController<Other> {
  constructor(protected service = new OtherService()) {
    super(service, {
      createValidator: COtherVal,
      editValidator: EOtherVal,
    });
  }
}
