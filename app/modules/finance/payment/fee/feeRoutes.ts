import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/fee/feeController.store'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.get(
      '/unpaid/:month',
      '/app/modules/finance/payment/fee/feeController.unpaidMonth'
    );

    Route.get(
      '/unpaid/:month/grade/:grade_id',
      '/app/modules/finance/payment/fee/feeController.unpaidMonthGrade'
    );

    Route.get(
      '/:student_id/non-paid-months',
      '/app/modules/finance/payment/fee/feeController.nonPaidMonths'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.post(
      '/stage',
      '/app/modules/finance/payment/fee/feeController.stage'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/fee/feeController.search'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.get(
      '/',
      '/app/modules/finance/payment/fee/feeController.index'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/fee/feeController.paginate'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/fee/feeController.show'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/fee/feeController.update'
    ).middleware([getAuthGuard(), 'can:edit-fee']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/fee/feeController.delete'
    ).middleware([getAuthGuard(), 'can:remove-fee']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/fee/feeController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-fee']);
  }).prefix('fees');
};
