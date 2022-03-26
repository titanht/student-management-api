import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/semester/semesterController.store'
    ).middleware([getAuthGuard(), 'can:add-semester']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/semester/semesterController.search'
    ).middleware([getAuthGuard(), 'can:view-semester']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/semester/semesterController.index'
    ).middleware([getAuthGuard(), 'can:view-semester']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/semester/semesterController.paginate'
    ).middleware([getAuthGuard(), 'can:view-semester']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/semester/semesterController.show'
    ).middleware([getAuthGuard(), 'can:view-semester']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/semester/semesterController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-semester']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/semester/semesterController.update'
    ).middleware([getAuthGuard(), 'can:edit-semester']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/semester/semesterController.delete'
    ).middleware([getAuthGuard(), 'can:remove-semester']);
  }).prefix('semesters');
};
