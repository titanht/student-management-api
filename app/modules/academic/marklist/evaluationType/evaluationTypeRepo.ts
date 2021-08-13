import { Repo } from 'app/modules/_shared/repo';
import EvaluationType from './evaluationType';

export default class EvaluationTypeRepo extends Repo<EvaluationType> {
  constructor() {
    super(EvaluationType);
  }
}
