import { Repo } from 'app/modules/_shared/repo';
import UserAttendance from './userAttendance';

export default class UserAttendanceRepo extends Repo<UserAttendance> {
  constructor() {
    super(UserAttendance);
  }
}
