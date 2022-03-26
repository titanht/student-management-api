import Service from 'app/modules/_shared/service';
import AttendanceMapping from './attendanceMapping';
import AttendanceMappingRepo from './attendanceMappingRepo';

export default class AttendanceMappingService extends Service<AttendanceMapping> {
  constructor() {
    super(new AttendanceMappingRepo());
  }
}
