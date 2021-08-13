import { Repo } from 'app/modules/_shared/repo';
import StudentAttendance from './studentAttendance';

export default class StudentAttendanceRepo extends Repo<StudentAttendance> {
  constructor() {
    super(StudentAttendance);
  }
}
