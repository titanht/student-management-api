import { Repo } from 'app/modules/_shared/repo';
import Sml from './sml';

export default class SmlRepo extends Repo<Sml> {
  constructor() {
    super(Sml);
  }
}
