import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.store'
    ).middleware([]);

    Route.post(
      '/pending',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.storePending'
    ).middleware([]);
  })
    .prefix('recurrent')
    .middleware(getAuthGuard());
};