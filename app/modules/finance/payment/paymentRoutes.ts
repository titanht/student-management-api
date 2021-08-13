import Route from '@ioc:Adonis/Core/Route';
import feeRoutes from './fee/feeRoutes';
import registrationRoutes from './registration/registrationRoutes';
import tutorialRoutes from './tutorial/tutorialRoutes';

export default () => {
  Route.group(() => {
    feeRoutes();
    registrationRoutes();
    tutorialRoutes();
  }).prefix('/finance/payment');
};
