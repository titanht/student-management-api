import { Repo } from 'app/modules/_shared/repo';
import Cst from './cst';

export default class CstRepo extends Repo<Cst> {
  constructor() {
    super(Cst);
  }
}
