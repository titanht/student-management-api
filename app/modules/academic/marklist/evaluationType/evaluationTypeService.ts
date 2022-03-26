import Service from 'app/modules/_shared/service';
import EvaluationType from './evaluationType';
import EvaluationTypeRepo from './evaluationTypeRepo';

export default class EvaluationTypeService extends Service<EvaluationType> {
  constructor() {
    super(new EvaluationTypeRepo());
  }
}
