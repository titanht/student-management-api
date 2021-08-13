import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/fetch-grade',
      '/app/modules/academic/homeRoom/hrt/hrtController.fetchGrade'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/',
      '/app/modules/academic/homeRoom/hrt/hrtController.store'
    ).middleware([getAuthGuard(), 'can:add-hrt']);

    Route.post(
      '/search',
      '/app/modules/academic/homeRoom/hrt/hrtController.search'
    ).middleware([getAuthGuard(), 'can:add-hrt']);

    Route.get(
      '/',
      '/app/modules/academic/homeRoom/hrt/hrtController.index'
    ).middleware([getAuthGuard(), 'can:view-hrt']);

    Route.get(
      '/paginate',
      '/app/modules/academic/homeRoom/hrt/hrtController.paginate'
    ).middleware([getAuthGuard(), 'can:view-hrt']);

    Route.get(
      '/:id',
      '/app/modules/academic/homeRoom/hrt/hrtController.show'
    ).middleware([getAuthGuard(), 'can:view-hrt']);

    Route.patch(
      '/:id',
      '/app/modules/academic/homeRoom/hrt/hrtController.update'
    ).middleware([getAuthGuard(), 'can:edit-hrt']);

    Route.delete(
      '/:id',
      '/app/modules/academic/homeRoom/hrt/hrtController.delete'
    ).middleware([getAuthGuard(), 'can:remove-hrt']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/homeRoom/hrt/hrtController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-hrt']);
  }).prefix('hrts');
};
