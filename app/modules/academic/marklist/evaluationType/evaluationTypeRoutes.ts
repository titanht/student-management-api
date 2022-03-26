import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.store'
    ).middleware([getAuthGuard(), 'can:add-evaluation-type']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.search'
    ).middleware([getAuthGuard(), 'can:view-evaluation-type']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.index'
    ).middleware([getAuthGuard(), 'can:view-evaluation-type']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.paginate'
    ).middleware([getAuthGuard(), 'can:view-evaluation-type']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.show'
    ).middleware([getAuthGuard(), 'can:view-evaluation-type']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-evaluation-type']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.update'
    ).middleware([getAuthGuard(), 'can:edit-evaluation-type']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/evaluationType/evaluationTypeController.delete'
    ).middleware([getAuthGuard(), 'can:remove-evaluation-type']);
  }).prefix('evaluation-types');
};
