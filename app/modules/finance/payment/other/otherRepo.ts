import { Repo } from 'app/modules/_shared/repo';
import Other from './other';

export default class OtherRepo extends Repo<Other> {
  constructor() {
    super(Other);
  }
}
