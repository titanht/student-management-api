import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/:gradeId',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.store'
    ).middleware([getAuthGuard(), 'can:add-student-attendance']);

    Route.post(
      '/search',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.search'
    ).middleware([getAuthGuard(), 'can:add-student-attendance']);

    Route.get(
      '/',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.index'
    ).middleware([getAuthGuard(), 'can:view-student-attendance']);

    Route.get(
      '/paginate',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.paginate'
    ).middleware([getAuthGuard(), 'can:view-student-attendance']);

    Route.get(
      '/:id',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.show'
    ).middleware([getAuthGuard(), 'can:view-student-attendance']);

    Route.patch(
      '/:id',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.update'
    ).middleware([getAuthGuard(), 'can:edit-student-attendance']);

    Route.delete(
      '/:id',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.delete'
    ).middleware([getAuthGuard(), 'can:remove-student-attendance']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/homeRoom/studentAttendance/studentAttendanceController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-student-attendance']);
  }).prefix('student-attendances');
};
