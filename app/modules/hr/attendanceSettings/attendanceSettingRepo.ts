import { Repo } from 'app/modules/_shared/repo';
import AttendanceSetting from './attendanceSetting';

export default class AttendanceSettingRepo extends Repo<AttendanceSetting> {
  constructor() {
    super(AttendanceSetting);
  }
}
