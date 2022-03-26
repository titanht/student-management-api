import ApiController from 'app/modules/_shared/apiController';
import AttendanceMapping from './attendanceMapping';
import AttendanceMappingService from './attendanceMappingService';
import CAttendanceMappingVal from './cAttendanceMappingVal';
import EAttendanceMappingVal from './eAttendanceMappingVal';

export default class AttendanceMappingController extends ApiController<AttendanceMapping> {
  constructor(protected service = new AttendanceMappingService()) {
    super(service, {
      createValidator: CAttendanceMappingVal,
      editValidator: EAttendanceMappingVal,
    });
  }
}
