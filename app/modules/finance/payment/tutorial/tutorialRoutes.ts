import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/tutorial/tutorialController.store'
    ).middleware([getAuthGuard(), 'can:add-tutorial']);

    Route.post(
      '/stage',
      '/app/modules/finance/payment/tutorial/tutorialController.stage'
    ).middleware([getAuthGuard(), 'can:add-tutorial']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/tutorial/tutorialController.search'
    ).middleware([getAuthGuard(), 'can:add-tutorial']);

    Route.get(
      '/',
      '/app/modules/finance/payment/tutorial/tutorialController.index'
    ).middleware([getAuthGuard(), 'can:view-tutorial']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/tutorial/tutorialController.paginate'
    ).middleware([getAuthGuard(), 'can:view-tutorial']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/tutorial/tutorialController.show'
    ).middleware([getAuthGuard(), 'can:view-tutorial']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/tutorial/tutorialController.update'
    ).middleware([getAuthGuard(), 'can:edit-tutorial']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/tutorial/tutorialController.delete'
    ).middleware([getAuthGuard(), 'can:remove-tutorial']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/tutorial/tutorialController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-tutorial']);
  }).prefix('tutorials');
};
