import { Repo } from 'app/modules/_shared/repo';
import Rc from './rc';

export default class ReportCardRepo extends Repo<Rc> {
  constructor() {
    super(Rc);
  }
}
