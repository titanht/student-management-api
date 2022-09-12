import Route from '@ioc:Adonis/Core/Route';
import hrtRoutes from './hrt/hrt-routes';
import studentAttendanceRoutes from './studentAttendance/student-attendance-routes';

export default () => {
  Route.group(() => {
    hrtRoutes();
    studentAttendanceRoutes();
  }).prefix('home-room');
};
