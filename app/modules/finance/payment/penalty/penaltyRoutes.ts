import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.get(
      '/:month',
      '/app/modules/finance/payment/penalty/penaltyController.getPenaltyCurrent'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.get(
      '/:month/:end_date',
      '/app/modules/finance/payment/penalty/penaltyController.getPenaltySlip'
    ).middleware([getAuthGuard(), 'can:add-fee']);
  }).prefix('penalties');
};
