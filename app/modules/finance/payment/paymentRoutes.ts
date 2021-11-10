import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';
import feeRoutes from './fee/feeRoutes';
import otherRoutes from './other/otherRoutes';
import penaltyConfigRoutes from './penaltyConfig/penaltyConfigRoutes';
import registrationRoutes from './registration/registrationRoutes';
import paymentReportRoutes from './report/paymentReportRoutes';
import stagePaymentRoutes from './stagePayment/stagePaymentRoutes';
import summerRoutes from './summer/summerRoutes';
import tutorialRoutes from './tutorial/tutorialRoutes';

export default () => {
  Route.group(() => {
    Route.delete(
      '/:id',
      '/app/modules/finance/payment/paymentController.delete'
    ).middleware([getAuthGuard()]);

    feeRoutes();
    otherRoutes();
    paymentReportRoutes();
    penaltyConfigRoutes();
    registrationRoutes();
    summerRoutes();
    stagePaymentRoutes();
    tutorialRoutes();
  }).prefix('/finance/payment');
};
