const modelName = 'GradeStudent';
const folder = 'academic/gradeStudent';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/grade-students',
  model: [
    {
      field: 'grade_id',
      type: 'string',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'grades',
      },
    },
    {
      field: 'student_id',
      type: 'string',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'students',
      },
    },
    {
      field: 'academic_year_id',
      type: 'string',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'academic_years',
      },
    },
  ],
  routes: {
    prefix: 'grade-students',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-student',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-student',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-student',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-student',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-student',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-student',
      },
    ],
  },
  roles: ['add-student', 'edit-student', 'remove-student', 'view-student'],
};
