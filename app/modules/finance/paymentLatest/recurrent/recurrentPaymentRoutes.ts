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

    Route.post(
      '/student-payment',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.storePayment'
    ).middleware([]);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentLatest/recurrent/recurrentPaymentController.show'
    ).middleware([]);
  })
    .prefix('recurrent')
    .middleware(getAuthGuard());
};
