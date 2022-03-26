import ApiController from 'app/modules/_shared/apiController';
import StudentProfile from './studentProfile';
import StudentProfileService from './studentProfileService';
import CStudentProfileVal from './cStudentProfileVal';
import EStudentProfileVal from './eStudentProfileVal';

export default class StudentProfileController extends ApiController<StudentProfile> {
  constructor(protected service = new StudentProfileService()) {
    super(service, {
      createValidator: CStudentProfileVal,
      editValidator: EStudentProfileVal,
    });
  }
}
