import Route from '@ioc:Adonis/Core/Route';
import academicYearRoutes from './academicYear/academicYearRoutes';
import gradeRoutes from './grade/gradeRoutes';
import gradeStudentRoutes from './gradeStudent/gradeStudentRoutes';
import homeRoomRoutes from './homeRoom/homeRoomRoutes';
import marklistRoutes from './marklist/marklistRoutes';
import scheduleRoutes from './schedule/scheduleRoutes';
import studentRoutes from './student/studentRoutes';
import studentProfileRoutes from './studentProfile/studentProfileRoutes';
import teacherRoutes from './teacher/teacherRoutes';

export default () => {
  Route.group(() => {
    academicYearRoutes();
    gradeRoutes();
    gradeStudentRoutes();
    homeRoomRoutes();
    marklistRoutes();
    scheduleRoutes();
    studentRoutes();
    studentProfileRoutes();
    teacherRoutes();
  }).prefix('academic');
};
