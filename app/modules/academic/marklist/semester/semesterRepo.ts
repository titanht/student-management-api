import { Repo } from 'app/modules/_shared/repo';
import Semester from './semester';

export default class SemesterRepo extends Repo<Semester> {
  constructor() {
    super(Semester);
  }
}
