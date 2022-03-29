// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Route from '@ioc:Adonis/Core/Route';
import academicRoutes from 'app/modules/academic/academicRoutes';
import authRoutes from 'app/modules/auth/authRoutes';
import paymentRoutes from 'app/modules/finance/payment/paymentRoutes';
import paymentNewRoutes from 'app/modules/finance/paymentNew/paymentNewRoutes';
import hrRoutes from 'app/modules/hr/hrRoutes';
import userRoutes from 'app/modules/user/userRoutes';

Route.group(() => {
  academicRoutes();

  authRoutes();

  paymentRoutes();

  paymentNewRoutes();

  hrRoutes();

  userRoutes();

  Route.any('/test', '/app/modules/testController.test');
  Route.any('/test2', '/app/modules/testController.test2');
  Route.any('/test3', '/app/modules/testController.test3');
  Route.any('/test4', '/app/modules/testController.test4');

  // Route.get('/auth', async ({ auth }: HttpContextContract) => {
  //   return auth.user?.id || 'Not Auth';
  // });
})
  .prefix('/api')
  .middleware('lastOp');

Route.get('/img', '/app/core/imageController.image');
