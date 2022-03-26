import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/set-active/:yearId',
      '/app/modules/academic/academicYear/academicYearController.setActive'
    ).middleware([getAuthGuard(), 'can:set-active-year']);

    Route.get(
      '/active',
      '/app/modules/academic/academicYear/academicYearController.active'
    ).middleware([getAuthGuard(), 'can:view-academic-year']);

    Route.post(
      '/',
      '/app/modules/academic/academicYear/academicYearController.store'
    ).middleware([getAuthGuard(), 'can:add-academic-year']);

    Route.post(
      '/search',
      '/app/modules/academic/academicYear/academicYearController.search'
    ).middleware([getAuthGuard(), 'can:add-academic-year']);

    Route.get(
      '/',
      '/app/modules/academic/academicYear/academicYearController.index'
    );

    Route.get(
      '/paginate',
      '/app/modules/academic/academicYear/academicYearController.paginate'
    ).middleware([getAuthGuard(), 'can:view-academic-year']);

    Route.get(
      '/:id',
      '/app/modules/academic/academicYear/academicYearController.show'
    ).middleware([getAuthGuard(), 'can:view-academic-year']);

    Route.post(
      '/show/:id',
      '/app/modules/academic/academicYear/academicYearController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-academic-year']);

    Route.patch(
      '/:id',
      '/app/modules/academic/academicYear/academicYearController.update'
    ).middleware([getAuthGuard(), 'can:edit-academic-year']);

    Route.delete(
      '/:id',
      '/app/modules/academic/academicYear/academicYearController.delete'
    ).middleware([getAuthGuard(), 'can:remove-academic-year']);
  }).prefix('academic-years');
};
