import Route from '@ioc:Adonis/Core/Route';
import feeRoutes from './fee/feeRoutes';
import registrationRoutes from './registration/registrationRoutes';
import summerRoutes from './summer/summerRoutes';
import tutorialRoutes from './tutorial/tutorialRoutes';

export default () => {
  Route.group(() => {
    feeRoutes();
    registrationRoutes();
    summerRoutes();
    tutorialRoutes();
  }).prefix('/finance/payment');
};
