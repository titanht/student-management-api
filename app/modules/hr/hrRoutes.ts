import Route from '@ioc:Adonis/Core/Route';
import userAttendanceRoutes from './attendance/userAttendanceRoutes';
import attendanceMappingRoutes from './attendanceMappings/attendanceMappingRoutes';
import attendanceSettingRoutes from './attendanceSettings/attendanceSettingRoutes';

export default () => {
  Route.group(() => {
    attendanceMappingRoutes();
    attendanceSettingRoutes();
    userAttendanceRoutes();
  }).prefix('hr');
};
