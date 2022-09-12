import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/homeRoom/hrt/hrtController.store'
    ).middleware([getAuthGuard(), 'can:add-hrt']);

    Route.delete(
      '/:id',
      '/app/modules/academic/homeRoom/hrt/hrtController.removeHrt'
    ).middleware([getAuthGuard(), 'can:remove-hrt']);
  }).prefix('hrts');
};
