import ApiController from 'app/modules/_shared/apiController';
import Cst from './cst';
import CstService from './cstService';
import CCstVal from './cCstVal';
import ECstVal from './eCstVal';

export default class CstController extends ApiController<Cst> {
  constructor(protected service = new CstService()) {
    super(service, {
      createValidator: CCstVal,
      editValidator: ECstVal,
    });
  }
}
