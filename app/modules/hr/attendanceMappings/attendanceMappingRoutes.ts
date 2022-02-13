import Route from '@ioc:Adonis/Core/Route';
import { getAuthGuard } from 'app/services/utils';

export default () => {
  Route.group(() => {
    Route.post(
      '/',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.store'
    );

    Route.post(
      '/search',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.search'
    ).middleware([getAuthGuard(), 'can:add-attendance-mapping']);

    Route.get(
      '/',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.index'
    ).middleware([getAuthGuard(), 'can:view-attendance-mapping']);

    Route.get(
      '/paginate',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.paginate'
    ).middleware([getAuthGuard(), 'can:view-attendance-mapping']);

    Route.get(
      '/:id',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.show'
    ).middleware([getAuthGuard(), 'can:view-attendance-mapping']);

    Route.patch(
      '/:id',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.update'
    ).middleware([getAuthGuard(), 'can:edit-attendance-mapping']);

    Route.delete(
      '/:id',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.delete'
    ).middleware([getAuthGuard(), 'can:remove-attendance-mapping']);

    Route.post(
      '/show/:id',
      '/app/modules/hr/attendanceMappings/attendanceMappingController.showDetail'
    ).middleware([getAuthGuard(), 'can:view-attendance-mapping']);
  }).prefix('attendance-mappings');
};
