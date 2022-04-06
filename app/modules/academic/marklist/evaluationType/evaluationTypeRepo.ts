import { Repo } from 'app/modules/_shared/repo';
import EvaluationType from './evaluationType';

export default class EvaluationTypeRepo extends Repo<EvaluationType> {
  constructor() {
    super(EvaluationType);
  }

  async findAll() {
    return (await this.model
      .query()
      .orderBy('name', 'asc')) as EvaluationType[];
  }
}
