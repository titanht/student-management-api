import test from 'japa';
// import UserAttendanceService from 'app/modules/hr/attendance/userAttendanceService';
import { transact } from 'app/test/testUtils';

// const attService = new UserAttendanceService();

transact('attendanceService', () => {
  test.only('create creates or updates', async () => {
    //
  });
});
