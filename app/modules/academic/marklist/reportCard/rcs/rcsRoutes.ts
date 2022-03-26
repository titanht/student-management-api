import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/generate/:gradeStudentId/:semesterId',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.generate'
    ).middleware([getAuthGuard(), 'can:generate-rcs']);

    Route.post(
      '/generate/class/:gradeId/:semesterId',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.generateClass'
    ).middleware([getAuthGuard(), 'can:generate-rcs']);

    Route.post(
      '/update-rank/:gradeId/:semesterId',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.updateRank'
    ).middleware([getAuthGuard(), 'can:update-rcs-rank']);

    Route.post(
      '/',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.store'
    ).middleware([getAuthGuard(), 'can:add-rcs']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.search'
    ).middleware([getAuthGuard(), 'can:add-rcs']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.index'
    ).middleware([getAuthGuard(), 'can:view-rcs']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.paginate'
    ).middleware([getAuthGuard(), 'can:view-rcs']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.show'
    ).middleware([getAuthGuard(), 'can:view-rcs']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.update'
    ).middleware([getAuthGuard(), 'can:edit-rcs']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.delete'
    ).middleware([getAuthGuard(), 'can:remove-rcs']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/reportCard/rcs/rcsController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-cst']);
  }).prefix('rcss');
};
