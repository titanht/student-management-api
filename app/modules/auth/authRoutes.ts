import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post('/login', '/app/modules/auth/authController.login');
    Route.post('/register', '/app/modules/auth/authController.register');

    Route.post(
      '/who-am-i',
      '/app/modules/auth/authController.whoAmI'
    ).middleware([getAuthGuard()]);
    Route.post('/logout', '/app/modules/auth/authController.logout').middleware(
      [getAuthGuard()]
    );
  }).prefix('auth');
};
