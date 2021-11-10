import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.store'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.search'
    ).middleware([getAuthGuard(), 'can:add-fee']);

    Route.get(
      '/',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.index'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.paginate'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.show'
    ).middleware([getAuthGuard(), 'can:view-fee']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.update'
    ).middleware([getAuthGuard(), 'can:edit-fee']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.delete'
    ).middleware([getAuthGuard(), 'can:remove-fee']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/penaltyConfig/penaltyConfigController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-fee']);
  }).prefix('penalty-configs');
};
