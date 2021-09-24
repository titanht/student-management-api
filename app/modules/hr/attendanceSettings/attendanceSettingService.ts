import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AttendanceSetting from './attendanceSetting';
import AttendanceSettingRepo from './attendanceSettingRepo';

export default class AttendanceSettingService extends Service<AttendanceSetting> {
  constructor() {
    super(new AttendanceSettingRepo());
  }

  async create(createData: Partial<AttendanceSetting>, _auth?: AuthContract) {
    const setting = await this.repo.findFirst();
    if (!setting) {
      return this.repo.createModel(createData);
    } else {
      return this.repo.updateModel(setting.id, createData);
    }
  }
}
