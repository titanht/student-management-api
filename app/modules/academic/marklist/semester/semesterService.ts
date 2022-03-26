import Service from 'app/modules/_shared/service';
import Semester from './semester';
import SemesterRepo from './semesterRepo';

export default class SemesterService extends Service<Semester> {
  constructor() {
    super(new SemesterRepo());
  }
}
