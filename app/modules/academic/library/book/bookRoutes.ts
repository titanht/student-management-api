import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/library/book/bookController.store'
    ).middleware([getAuthGuard(), 'can:add-book']);

    Route.post(
      '/search',
      '/app/modules/academic/library/book/bookController.search'
    ).middleware([getAuthGuard(), 'can:add-book']);

    Route.get(
      '/',
      '/app/modules/academic/library/book/bookController.index'
    ).middleware([getAuthGuard(), 'can:view-book']);

    Route.get(
      '/paginate',
      '/app/modules/academic/library/book/bookController.paginate'
    ).middleware([getAuthGuard(), 'can:view-book']);

    Route.get(
      '/:id',
      '/app/modules/academic/library/book/bookController.show'
    ).middleware([getAuthGuard(), 'can:view-book']);

    Route.patch(
      '/:id',
      '/app/modules/academic/library/book/bookController.update'
    ).middleware([getAuthGuard(), 'can:edit-book']);

    Route.delete(
      '/:id',
      '/app/modules/academic/library/book/bookController.delete'
    ).middleware([getAuthGuard(), 'can:remove-book']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/library/book/bookController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-book']);
  }).prefix('books');
};
