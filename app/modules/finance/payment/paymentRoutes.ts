import Route from '@ioc:Adonis/Core/Route';
import feeRoutes from './fee/feeRoutes';
import otherRoutes from './other/otherRoutes';
import registrationRoutes from './registration/registrationRoutes';
import stagePaymentRoutes from './stagePayment/stagePaymentRoutes';
import summerRoutes from './summer/summerRoutes';
import tutorialRoutes from './tutorial/tutorialRoutes';

export default () => {
  Route.group(() => {
    feeRoutes();
    otherRoutes();
    registrationRoutes();
    summerRoutes();
    stagePaymentRoutes();
    tutorialRoutes();
  }).prefix('/finance/payment');
};
