import ApiController from 'app/modules/_shared/apiController';
import Sml from './sml';
import SmlService from './smlService';
import CSmlVal from './cSmlVal';
import ESmlVal from './eSmlVal';

export default class SmlController extends ApiController<Sml> {
  constructor(protected service = new SmlService()) {
    super(service, {
      createValidator: CSmlVal,
      editValidator: ESmlVal,
    });
  }
}
