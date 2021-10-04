import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/',
      '/app/modules/academic/schedule/scheduleController.getSchedule'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/generate',
      '/app/modules/academic/schedule/scheduleController.generate'
    ).middleware([getAuthGuard(), 'can:create-schedule']);

    Route.post(
      '/finalize',
      '/app/modules/academic/schedule/scheduleController.finalize'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/swappable',
      '/app/modules/academic/schedule/scheduleController.isSwappable'
    ).middleware([getAuthGuard()]);

    Route.patch(
      '/update',
      '/app/modules/academic/schedule/scheduleController.updateSchedule'
    ).middleware([getAuthGuard()]);
  }).prefix('schedules');
};
