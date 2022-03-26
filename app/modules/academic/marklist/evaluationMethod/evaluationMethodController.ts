import ApiController from 'app/modules/_shared/apiController';
import EvaluationMethod from './evaluationMethod';
import EvaluationMethodService from './evaluationMethodService';
import CEvaluationMethodVal from './cEvaluationMethodVal';
import EEvaluationMethodVal from './eEvaluationMethodVal';

export default class EvaluationMethodController extends ApiController<EvaluationMethod> {
  constructor(protected service = new EvaluationMethodService()) {
    super(service, {
      createValidator: CEvaluationMethodVal,
      editValidator: EEvaluationMethodVal,
    });
  }
}
