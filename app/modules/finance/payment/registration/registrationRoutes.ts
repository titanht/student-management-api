import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/finance/payment/registration/registrationController.store'
    ).middleware([getAuthGuard(), 'can:add-registration']);

    Route.post(
      '/stage',
      '/app/modules/finance/payment/registration/registrationController.stage'
    ).middleware([getAuthGuard(), 'can:add-registration']);

    Route.post(
      '/search',
      '/app/modules/finance/payment/registration/registrationController.search'
    ).middleware([getAuthGuard(), 'can:add-registration']);

    Route.get(
      '/',
      '/app/modules/finance/payment/registration/registrationController.index'
    ).middleware([getAuthGuard(), 'can:view-registration']);

    Route.get(
      '/paginate',
      '/app/modules/finance/payment/registration/registrationController.paginate'
    ).middleware([getAuthGuard(), 'can:view-registration']);

    Route.get(
      '/:id',
      '/app/modules/finance/payment/registration/registrationController.show'
    ).middleware([getAuthGuard(), 'can:view-registration']);

    Route.patch(
      '/:id',
      '/app/modules/finance/payment/registration/registrationController.update'
    ).middleware([getAuthGuard(), 'can:edit-registration']);

    Route.delete(
      '/:id',
      '/app/modules/finance/payment/registration/registrationController.delete'
    ).middleware([getAuthGuard(), 'can:remove-registration']);

    Route.post(
      '/show/:id',
      '/app/modules/finance/payment/registration/registrationController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-registration']);
  }).prefix('registrations');
};
