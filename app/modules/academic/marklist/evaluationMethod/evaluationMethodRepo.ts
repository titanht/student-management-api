import { Repo } from 'app/modules/_shared/repo';
import EvaluationMethod from './evaluationMethod';

export default class EvaluationMethodRepo extends Repo<EvaluationMethod> {
  constructor() {
    super(EvaluationMethod);
  }
}
