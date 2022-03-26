import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/summer/summerController.store'
    ).middleware([getAuthGuard(), 'can:add-summer']);

    Route.post(
      '/stage',
      '/app/modules/finance/payment/summer/summerController.stage'
    ).middleware([getAuthGuard(), 'can:add-summer']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/summer/summerController.search'
    ).middleware([getAuthGuard(), 'can:add-summer']);

    Route.get(
      '/',
      '/app/modules/finance/payment/summer/summerController.index'
    ).middleware([getAuthGuard(), 'can:view-summer']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/summer/summerController.paginate'
    ).middleware([getAuthGuard(), 'can:view-summer']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/summer/summerController.show'
    ).middleware([getAuthGuard(), 'can:view-summer']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/summer/summerController.update'
    ).middleware([getAuthGuard(), 'can:edit-summer']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/summer/summerController.delete'
    ).middleware([getAuthGuard(), 'can:remove-summer']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/summer/summerController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-summer']);
  }).prefix('summers');
};
