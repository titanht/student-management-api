import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/subject/subjectController.store'
    ).middleware([getAuthGuard(), 'can:add-subject']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/subject/subjectController.search'
    ).middleware([getAuthGuard(), 'can:view-subject']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/subject/subjectController.index'
    ).middleware([getAuthGuard(), 'can:view-subject']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/subject/subjectController.paginate'
    ).middleware([getAuthGuard(), 'can:view-subject']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/subject/subjectController.show'
    ).middleware([getAuthGuard(), 'can:view-subject']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/subject/subjectController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-subject']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/subject/subjectController.update'
    ).middleware([getAuthGuard(), 'can:edit-subject']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/subject/subjectController.delete'
    ).middleware([getAuthGuard(), 'can:remove-subject']);
  }).prefix('subjects');
};
