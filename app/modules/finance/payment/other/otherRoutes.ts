import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/other/otherController.store'
    ).middleware([getAuthGuard(), 'can:add-other']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/other/otherController.search'
    ).middleware([getAuthGuard(), 'can:add-other']);

    Route.get(
      '/',
      '/app/modules/finance/payment/other/otherController.index'
    ).middleware([getAuthGuard(), 'can:view-other']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/other/otherController.paginate'
    ).middleware([getAuthGuard(), 'can:view-other']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/other/otherController.show'
    ).middleware([getAuthGuard(), 'can:view-other']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/other/otherController.update'
    ).middleware([getAuthGuard(), 'can:edit-other']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/other/otherController.delete'
    ).middleware([getAuthGuard(), 'can:remove-other']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/other/otherController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-other']);
  }).prefix('others');
};
