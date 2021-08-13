import ApiController from 'app/modules/_shared/apiController';
import Student from './student';
import StudentService from './studentService';
import CStudentVal from './cStudentVal';
import EStudentVal from './eStudentVal';

export default class StudentController extends ApiController<Student> {
  constructor(protected service = new StudentService()) {
    super(service, {
      createValidator: CStudentVal,
      editValidator: EStudentVal,
    });
  }
}
