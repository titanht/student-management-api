import { Repo } from 'app/modules/_shared/repo';
import Fee from './fee';

export default class FeeRepo extends Repo<Fee> {
  constructor() {
    super(Fee);
  }
}
