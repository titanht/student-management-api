import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/quarter/quarterController.store'
    ).middleware([getAuthGuard(), 'can:add-quarter']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/quarter/quarterController.search'
    ).middleware([getAuthGuard(), 'can:view-quarter']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/quarter/quarterController.index'
    ).middleware([getAuthGuard(), 'can:view-quarter']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/quarter/quarterController.paginate'
    ).middleware([getAuthGuard(), 'can:view-quarter']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/quarter/quarterController.show'
    ).middleware([getAuthGuard(), 'can:view-quarter']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/quarter/quarterController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-quarter']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/quarter/quarterController.update'
    ).middleware([getAuthGuard(), 'can:edit-quarter']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/quarter/quarterController.delete'
    ).middleware([getAuthGuard(), 'can:remove-quarter']);
  }).prefix('quarters');
};
