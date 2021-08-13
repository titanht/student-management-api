import ApiController from 'app/modules/_shared/apiController';
import Semester from './semester';
import SemesterService from './semesterService';
import CSemesterVal from './cSemesterVal';
import ESemesterVal from './eSemesterVal';

export default class SemesterController extends ApiController<Semester> {
  constructor(protected service = new SemesterService()) {
    super(service, {
      createValidator: CSemesterVal,
      editValidator: ESemesterVal,
    });
  }
}
