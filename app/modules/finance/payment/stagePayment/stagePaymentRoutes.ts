import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.store'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.search'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.post(
      '/commit',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.commit'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.get(
      '/fetch-all',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.fetchAll'
    ).middleware([
      getAuthGuard(),
      // 'can:add-stage-payment'
    ]);

    Route.get(
      '/summary',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.summary'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.get(
      '/fs',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.getFs'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.get(
      '/is-pending',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.isPending'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.get(
      '/is-pending/:type',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.isPendingType'
    ).middleware([getAuthGuard(), 'can:add-stage-payment']);

    Route.get(
      '/',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.index'
    ).middleware([getAuthGuard(), 'can:view-stage-payment']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.paginate'
    ).middleware([getAuthGuard(), 'can:view-stage-payment']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.show'
    ).middleware([getAuthGuard(), 'can:view-stage-payment']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.update'
    ).middleware([getAuthGuard(), 'can:edit-stage-payment']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.delete'
    ).middleware([getAuthGuard(), 'can:remove-stage-payment']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/stagePayment/stagePaymentController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-stage-payment']);
  }).prefix('stage-payments');
};
