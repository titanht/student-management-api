import Route from '@ioc:Adonis/Core/Route';

export default () => {
  Route.group(() => {
    Route.post('/login', '/app/modules/auth/authController.login');
    Route.post('/register', '/app/modules/auth/authController.register');
  }).prefix('auth');
};
