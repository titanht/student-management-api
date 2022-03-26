import Service from 'app/modules/_shared/service';
import Cst from './cst';
import CstRepo from './cstRepo';

export default class CstService extends Service<Cst> {
  constructor() {
    super(new CstRepo());
  }
}
