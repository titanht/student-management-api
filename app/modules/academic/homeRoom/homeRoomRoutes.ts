import Route from '@ioc:Adonis/Core/Route';
import hrtRoutes from './hrt/hrtRoutes';
import studentAttendanceRoutes from './studentAttendance/studentAttendanceRoutes';

export default () => {
  Route.group(() => {
    hrtRoutes();
    studentAttendanceRoutes();
  }).prefix('home-room');
};
