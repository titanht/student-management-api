import Route from '@ioc:Adonis/Core/Route';
// import { getAuthGuard } from 'app/services/utils';
import rcqRoutes from './rcq/rcqRoutes';
import rcsRoutes from './rcs/rcsRoutes';
import rcyRoutes from './rcy/rcyRoutes';

export default () => {
  Route.group(() => {
    rcqRoutes();
    rcsRoutes();
    rcyRoutes();

    Route.get(
      '/generate-pdf/:gradeId',
      '/app/modules/academic/marklist/reportCard/reportCardController.generatePdf'
    ).middleware([
      // getAuthGuard(),
      // 'can:generate-report-pdf'
    ]);

    Route.post(
      '/generate-all/:gradeId',
      '/app/modules/academic/marklist/reportCard/reportCardController.generateAll'
    );

    Route.get(
      '/roster/:gradeId',
      '/app/modules/academic/marklist/reportCard/reportCardController.generateRoster'
    );
  }).prefix('report-card');
};
