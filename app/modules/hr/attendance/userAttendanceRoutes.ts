import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/hr/attendance/userAttendanceController.store'
    ).middleware([
      // getAuthGuard(), 'can:add-user-attendance'
    ]);

    Route.post(
      '/search',
      '/app/modules/hr/attendance/userAttendanceController.search'
    ).middleware([getAuthGuard(), 'can:add-user-attendance']);

    Route.get(
      '/',
      '/app/modules/hr/attendance/userAttendanceController.index'
    ).middleware([getAuthGuard(), 'can:view-user-attendance']);

    Route.get(
      '/paginate',
      '/app/modules/hr/attendance/userAttendanceController.paginate'
    ).middleware([getAuthGuard(), 'can:view-user-attendance']);

    Route.get(
      '/:id',
      '/app/modules/hr/attendance/userAttendanceController.show'
    ).middleware([getAuthGuard(), 'can:view-user-attendance']);

    Route.patch(
      '/:id',
      '/app/modules/hr/attendance/userAttendanceController.update'
    ).middleware([getAuthGuard(), 'can:edit-user-attendance']);

    Route.delete(
      '/:id',
      '/app/modules/hr/attendance/userAttendanceController.delete'
    ).middleware([getAuthGuard(), 'can:remove-user-attendance']);

    Route.post(
      '/show/:id',
      '/app/modules/hr/attendance/userAttendanceController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-user-attendance']);
  }).prefix('attendances');
};
