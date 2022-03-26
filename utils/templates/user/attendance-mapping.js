const modelName = 'AttendanceMapping';
const folder = 'hr/attendanceMappings';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/hr/attendance-mappings',
  model: [
    {
      field: 'account_id',
      type: 'string',
      required: true,
      editable: true,
      unique: true,
    },
    {
      field: 'attendance_setting_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'attendance_settings',
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
  ],
  routes: {
    prefix: 'attendance-mappings',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-attendance-mapping',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-attendance-mapping',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-attendance-mapping',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-attendance-mapping',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-attendance-mapping',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-attendance-mapping',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-attendance-mapping',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-attendance-mapping',
      },
    ],
  },
  roles: [
    'add-attendance-mapping',
    'edit-attendance-mapping',
    'remove-attendance-mapping',
    'view-attendance-mapping',
  ],
};
