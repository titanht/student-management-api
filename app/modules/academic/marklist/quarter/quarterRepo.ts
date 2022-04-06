import { Repo } from 'app/modules/_shared/repo';
import Quarter from './quarter';

export default class QuarterRepo extends Repo<Quarter> {
  constructor() {
    super(Quarter);
  }

  async findAll() {
    return (await this.model.query().orderBy('quarter', 'asc')) as Quarter[];
  }
}
