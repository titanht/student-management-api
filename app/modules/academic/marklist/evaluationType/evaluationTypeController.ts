import ApiController from 'app/modules/_shared/apiController';
import EvaluationType from './evaluationType';
import EvaluationTypeService from './evaluationTypeService';
import CEvaluationTypeVal from './cEvaluationTypeVal';
import EEvaluationTypeVal from './eEvaluationTypeVal';

export default class EvaluationTypeController extends ApiController<EvaluationType> {
  constructor(protected service = new EvaluationTypeService()) {
    super(service, {
      createValidator: CEvaluationTypeVal,
      editValidator: EEvaluationTypeVal,
    });
  }
}
