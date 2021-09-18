import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/schedule/scheduleController.generate'
    );
    // .middleware([getAuthGuard(), 'can:create-schedule']);
  }).prefix('schedules');
};
