const modelName = 'StudentAttendance';
const folder = 'academic/homeRoom/studentAttendance';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/home-room/student-attendance',
  model: [
    {
      field: 'student_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'students',
      },
    },
    {
      field: 'user_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'users',
      },
    },
    {
      field: 'academic_year_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'academic_years',
      },
    },
    {
      field: 'status',
      type: 'enum',
      required: true,
      editable: true,
    },
    {
      field: 'date',
      type: 'date',
      required: true,
      editable: true,
    },
    {
      field: 'late_reason',
      type: 'string',
      editable: true,
    },
  ],
  routes: {
    prefix: 'student-attendances',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-student-attendance',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-student-attendance',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-student-attendance',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-student-attendance',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-student-attendance',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-student-attendance',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-student-attendance',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-student-attendance',
      },
    ],
  },
  roles: [
    'add-student-attendance',
    'edit-student-attendance',
    'remove-student-attendance',
    'view-student-attendance',
  ],
};
