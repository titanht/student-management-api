import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/student/change-grade',
      '/app/modules/academic/gradeStudent/gradeStudentController.changeStudentGrade'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.post(
      '/:gradeStudentId/change-grade',
      '/app/modules/academic/gradeStudent/gradeStudentController.changeGrade'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.post(
      '/promote-grade',
      '/app/modules/academic/gradeStudent/gradeStudentController.promoteGrade'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.post(
      '/',
      '/app/modules/academic/gradeStudent/gradeStudentController.store'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.post(
      '/search',
      '/app/modules/academic/gradeStudent/gradeStudentController.search'
    ).middleware([getAuthGuard(), 'can:add-student']);

    Route.get(
      '/',
      '/app/modules/academic/gradeStudent/gradeStudentController.index'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.get(
      '/paginate',
      '/app/modules/academic/gradeStudent/gradeStudentController.paginate'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.get(
      '/:id',
      '/app/modules/academic/gradeStudent/gradeStudentController.show'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/gradeStudent/gradeStudentController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-student']);

    Route.patch(
      '/:id',
      '/app/modules/academic/gradeStudent/gradeStudentController.update'
    ).middleware([getAuthGuard(), 'can:edit-student']);

    Route.delete(
      '/:id',
      '/app/modules/academic/gradeStudent/gradeStudentController.delete'
    ).middleware([getAuthGuard(), 'can:remove-student']);
  }).prefix('grade-students');
};
