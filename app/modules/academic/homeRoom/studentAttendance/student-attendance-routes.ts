import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/:gradeId/:date',
      '/app/modules/academic/homeRoom/studentAttendance/student-attendance-controller.getGradeDateAttendance'
    ).middleware([getAuthGuard()]);

    // TODO: Add separate route for teacher auth
    Route.post(
      '/:gradeId',
      '/app/modules/academic/homeRoom/studentAttendance/student-attendance-controller.store'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/non-sent',
      '/app/modules/academic/homeRoom/studentAttendance/student-attendance-controller.nonSent'
    ).middleware([getAuthGuard()]);
  }).prefix('student-attendances');
};
