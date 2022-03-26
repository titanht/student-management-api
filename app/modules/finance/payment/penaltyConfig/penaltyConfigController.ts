import ApiController from 'app/modules/_shared/apiController';
import PenaltyConfig from './penaltyConfig';
import PenaltyConfigService from './penaltyConfigService';
import CPenaltyConfigVal from './cPenaltyConfigVal';
import EPenaltyConfigVal from './ePenaltyConfigVal';

export default class PenaltyConfigController extends ApiController<PenaltyConfig> {
  constructor(protected service = new PenaltyConfigService()) {
    super(service, {
      createValidator: CPenaltyConfigVal,
      editValidator: EPenaltyConfigVal,
    });
  }
}
