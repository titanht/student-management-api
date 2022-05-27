import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/generate/:gradeStudentId/:academicYearId',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.generate'
    ).middleware([getAuthGuard(), 'can:generate-rcy']);

    Route.post(
      '/generate/class/:gradeId/:academicYearId',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.generateClass'
    ).middleware([getAuthGuard(), 'can:generate-rcy']);

    Route.post(
      '/update-rank/:gradeId/:academicYearId',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.updateRank'
    ).middleware([getAuthGuard(), 'can:update-rcy-rank']);

    Route.get(
      '/grade/:gradeId/year',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.rcyGradeYear'
    ).middleware([getAuthGuard(), 'can:view-rcy']);

    Route.post(
      '/',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.store'
    ).middleware([getAuthGuard(), 'can:add-rcy']);

    Route.post(
      '/search',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.search'
    ).middleware([
      getAuthGuard(),
      // 'can:add-rcy'
    ]);

    Route.get(
      '/',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.index'
    ).middleware([getAuthGuard(), 'can:view-rcy']);

    Route.get(
      '/paginate',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.paginate'
    ).middleware([getAuthGuard(), 'can:view-rcy']);

    Route.get(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.show'
    ).middleware([getAuthGuard(), 'can:view-rcy']);

    Route.patch(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.update'
    ).middleware([getAuthGuard(), 'can:edit-rcy']);

    Route.delete(
      '/:id',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.delete'
    ).middleware([getAuthGuard(), 'can:remove-rcy']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/marklist/reportCard/rcy/rcyController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-rcy']);
  }).prefix('rcys');
};
