// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Route from '@ioc:Adonis/Core/Route';
import academicRoutes from 'app/modules/academic/academicRoutes';
import authRoutes from 'app/modules/auth/authRoutes';
import paymentRoutes from 'app/modules/finance/payment/paymentRoutes';
import hrRoutes from 'app/modules/hr/hrRoutes';
import userRoutes from 'app/modules/user/userRoutes';

Route.group(() => {
  academicRoutes();

  authRoutes();

  paymentRoutes();

  hrRoutes();

  userRoutes();

  Route.post('/test', async ({}) => {
    return { hello: 'world' };
  });

  // Route.get('/auth', async ({ auth }: HttpContextContract) => {
  //   return auth.user?.id || 'Not Auth';
  // });
}).prefix('/api');
