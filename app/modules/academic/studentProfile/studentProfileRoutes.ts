import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/studentProfile/studentProfileController.store'
    ).middleware([getAuthGuard(), 'can:add-student-profile']);

    Route.post(
      '/search',
      '/app/modules/academic/studentProfile/studentProfileController.search'
    ).middleware([getAuthGuard(), 'can:add-student-profile']);

    Route.get(
      '/',
      '/app/modules/academic/studentProfile/studentProfileController.index'
    ).middleware([getAuthGuard(), 'can:view-student-profile']);

    Route.get(
      '/paginate',
      '/app/modules/academic/studentProfile/studentProfileController.paginate'
    ).middleware([getAuthGuard(), 'can:view-student-profile']);

    Route.get(
      '/:id',
      '/app/modules/academic/studentProfile/studentProfileController.show'
    ).middleware([getAuthGuard(), 'can:view-student-profile']);

    Route.patch(
      '/:id',
      '/app/modules/academic/studentProfile/studentProfileController.update'
    ).middleware([getAuthGuard(), 'can:edit-student-profile']);

    Route.delete(
      '/:id',
      '/app/modules/academic/studentProfile/studentProfileController.delete'
    ).middleware([getAuthGuard(), 'can:remove-student-profile']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/studentProfile/studentProfileController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-student-profile']);
  }).prefix('student-profiles');
};
