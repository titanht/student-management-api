import ApiController from 'app/modules/_shared/apiController';
import StudentAttendance from './studentAttendance';
import StudentAttendanceService from './studentAttendanceService';
import CStudentAttendanceVal from './cStudentAttendanceVal';
import EStudentAttendanceVal from './eStudentAttendanceVal';

export default class StudentAttendanceController extends ApiController<StudentAttendance> {
  constructor(protected service = new StudentAttendanceService()) {
    super(service, {
      createValidator: CStudentAttendanceVal,
      editValidator: EStudentAttendanceVal,
    });
  }
}
