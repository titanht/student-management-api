import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/generate/:gradeStudentId/:quarterId',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.generate'
    ).middleware([getAuthGuard(), 'can:generate-rcq']);

    Route.post(
      '/generate/class/:gradeId/:quarterId',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.generateClass'
    ).middleware([getAuthGuard(), 'can:generate-rcq']);

    Route.post(
      '/update-rank/:gradeId/:quarterId',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.updateRank'
    ).middleware([getAuthGuard(), 'can:update-rcq-rank']);

    Route.get(
      '/grade/:gradeId/quarter/:quarterId',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.rcqGradeQuarter'
    ).middleware([getAuthGuard(), 'can:view-rcq']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.search'
    ).middleware([getAuthGuard(), 'can:add-rcq']);

    Route.get(
      '/',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.index'
    ).middleware([getAuthGuard(), 'can:view-rcq']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.paginate'
    ).middleware([getAuthGuard(), 'can:view-rcq']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.show'
    ).middleware([getAuthGuard(), 'can:view-rcq']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.delete'
    ).middleware([getAuthGuard(), 'can:remove-rcq']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/reportCard/rcq/rcqController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-rcq']);
  }).prefix('rcqs');
};
