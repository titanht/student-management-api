import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/interval',
      '/app/modules/finance/payment/report/paymentReportController.interval'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/daily',
      '/app/modules/finance/payment/report/paymentReportController.daily'
    ).middleware([getAuthGuard()]);
  }).prefix('reports');
};
