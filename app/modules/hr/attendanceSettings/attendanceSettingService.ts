import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AttendanceSetting from './attendanceSetting';
import AttendanceSettingRepo from './attendanceSettingRepo';

export default class AttendanceSettingService extends Service<AttendanceSetting> {
  constructor() {
    super(new AttendanceSettingRepo());
  }
}
