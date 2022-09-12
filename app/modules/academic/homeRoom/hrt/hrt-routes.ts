import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/non-hrts',
      '/app/modules/academic/homeRoom/hrt/hrt-controller.getNonHrts'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/students',
      '/app/modules/academic/homeRoom/hrt/hrt-controller.homeRoomHrts'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/',
      '/app/modules/academic/homeRoom/hrt/hrt-controller.store'
    ).middleware([getAuthGuard(), 'can:add-hrt']);

    Route.delete(
      '/:id',
      '/app/modules/academic/homeRoom/hrt/hrt-controller.removeHrt'
    ).middleware([getAuthGuard(), 'can:remove-hrt']);
  }).prefix('hrts');
};
