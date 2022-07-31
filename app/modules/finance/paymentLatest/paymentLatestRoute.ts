import Route from '@ioc:Adonis/Core/Route';
import fixedPaymentRoute from './fixed/fixedPaymentRoute';

export default () => {
  Route.group(() => {
    fixedPaymentRoute();
  }).prefix('payment-latest');
};
