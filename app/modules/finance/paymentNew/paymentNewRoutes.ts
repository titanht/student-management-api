import Route from '@ioc:Adonis/Core/Route';
import registrationPaymentRoutes from './registrationPayment/registrationPaymentRoutes';

export default () =>
  Route.group(() => {
    registrationPaymentRoutes();
  }).prefix('finance/payment-new');
