import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/:gradeId',
      '/app/modules/academic/homeRoom/studentAttendance/student-attendance-controller.store'
    ).middleware([getAuthGuard()]);
  }).prefix('student-attendances');
};
