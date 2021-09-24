import ApiController from 'app/modules/_shared/apiController';
import AttendanceSetting from './attendanceSetting';
import AttendanceSettingService from './attendanceSettingService';
import CAttendanceSettingVal from './cAttendanceSettingVal';

export default class AttendanceSettingController extends ApiController<AttendanceSetting> {
  constructor(protected service = new AttendanceSettingService()) {
    super(service, {
      createValidator: CAttendanceSettingVal,
    });
  }
}
