import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/activeness',
      '/app/modules/academic/gradeStudent/_lib/activeness/grade_student_activeness_controller.store'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/grade-with-students/:yearId',
      '/app/modules/academic/gradeStudent/gradeStudentController.gradeWithStudents'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/year-grade-students/all/:yearId',
      '/app/modules/academic/gradeStudent/gradeStudentController.allYearGradeStudents'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/year-grade-students/:yearId/:gradeId',
      '/app/modules/academic/gradeStudent/gradeStudentController.yearGradeStudents'
    ).middleware([getAuthGuard()]);

    Route.get(
      '/year-students/:gradeId/:yearId',
      '/app/modules/academic/gradeStudent/gradeStudentController.yearStudents'
    ).middleware([getAuthGuard()]);

    Route.post(
      '/student/multiple/change-grade',
      '/app/modules/academic/gradeStudent/gradeStudentController.changeMultiStudentGrade'
    ).middleware([getAuthGuard(), 'can:add-student']);

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
  }).prefix('/grade-students');
};
