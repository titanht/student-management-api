import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/academic/teacher/teacherController.store'
    ).middleware([getAuthGuard(), 'can:add-teacher']);

    Route.post(
      '/search',
      '/app/modules/academic/teacher/teacherController.search'
    ).middleware([getAuthGuard(), 'can:view-teacher']);

    Route.get(
      '/',
      '/app/modules/academic/teacher/teacherController.index'
    ).middleware([getAuthGuard(), 'can:view-teacher']);

    Route.get(
      '/paginate',
      '/app/modules/academic/teacher/teacherController.paginate'
    ).middleware([getAuthGuard(), 'can:view-teacher']);

    Route.get(
      '/:id',
      '/app/modules/academic/teacher/teacherController.show'
    ).middleware([getAuthGuard(), 'can:view-teacher']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/teacher/teacherController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-teacher']);

    Route.patch(
      '/:id',
      '/app/modules/academic/teacher/teacherController.update'
    ).middleware([getAuthGuard(), 'can:edit-teacher']);

    Route.delete(
      '/:id',
      '/app/modules/academic/teacher/teacherController.delete'
    ).middleware([getAuthGuard(), 'can:remove-teacher']);
  }).prefix('teachers');
};
