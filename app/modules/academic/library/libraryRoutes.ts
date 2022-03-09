import Route from '@ioc:Adonis/Core/Route';
import bookRoutes from './book/bookRoutes';

export default () => {
  Route.group(() => {
    bookRoutes();
  }).prefix('library');
};
