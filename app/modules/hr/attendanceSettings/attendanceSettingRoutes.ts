import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.store'
    );

    Route.post(
      '/search',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.search'
    ).middleware([getAuthGuard(), 'can:add-attendance-setting']);

    Route.get(
      '/',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.index'
    );

    Route.get(
      '/paginate',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.paginate'
    ).middleware([getAuthGuard(), 'can:view-attendance-setting']);

    Route.get(
      '/:id',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.show'
    ).middleware([getAuthGuard(), 'can:view-attendance-setting']);

    Route.delete(
      '/:id',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.delete'
    ).middleware([getAuthGuard(), 'can:remove-attendance-setting']);

    Route.post(
      '/show/:id',
      '/app/modules/hr/attendanceSettings/attendanceSettingController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-attendance-setting']);
  }).prefix('attendance-settings');
};
