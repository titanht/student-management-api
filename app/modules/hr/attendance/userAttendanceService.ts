import Service from 'app/modules/_shared/service';
import UserAttendance from './userAttendance';
import UserAttendanceRepo from './userAttendanceRepo';

export default class UserAttendanceService extends Service<UserAttendance> {
  constructor() {
    super(new UserAttendanceRepo());
  }

  async insertAttendances(createData: UserAttendance[]) {
    //
  }
}
