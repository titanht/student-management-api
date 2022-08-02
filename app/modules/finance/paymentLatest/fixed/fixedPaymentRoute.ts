import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.create'
    ).middleware([]);

    Route.post(
      '/pending',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.createPending'
    ).middleware([]);

    Route.get(
      '/:id',
      '/app/modules/finance/paymentLatest/fixed/fixedPaymentController.show'
    ).middleware([]);
  })
    .prefix('fixed')
    .middleware([getAuthGuard()]);
};
