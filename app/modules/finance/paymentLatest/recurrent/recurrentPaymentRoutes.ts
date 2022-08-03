import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.store'
    ).middleware([]);
  })
    .prefix('recurrent')
    .middleware(getAuthGuard());
};
