import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.store'
    ).middleware([getAuthGuard(), 'can:add-evaluation-method']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.search'
    ).middleware([getAuthGuard(), 'can:add-evaluation-method']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.index'
    ).middleware([getAuthGuard(), 'can:view-evaluation-method']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.paginate'
    ).middleware([getAuthGuard(), 'can:view-evaluation-method']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.show'
    ).middleware([getAuthGuard(), 'can:view-evaluation-method']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-evaluation-method']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.update'
    ).middleware([getAuthGuard(), 'can:edit-evaluation-method']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/evaluationMethod/evaluationMethodController.delete'
    ).middleware([getAuthGuard(), 'can:remove-evaluation-method']);
  }).prefix('evaluation-methods');
};
