import Route from '@ioc:Adonis/Core/Route';
import fixedPaymentRoute from './fixed/fixedPaymentRoute';
import recurrentPaymentRoutes from './recurrent/recurrentPaymentRoutes';

export default () => {
  Route.group(() => {
    fixedPaymentRoute();
    recurrentPaymentRoutes();
  }).prefix('payment-latest');
};
