const modelName = 'AttendanceSetting';
const folder = 'hr/attendanceSettings';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/hr/attendance-settings',
  model: [
    {
      field: 'in_begin',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'in_end',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'late_in',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'out_begin',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'out_end',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'early_out',
      type: 'string',
      required: false,
      editable: true,
    },
    {
      field: 'title',
      type: 'string',
      required: false,
      editable: true,
    },
  ],
  routes: {
    prefix: 'attendance-settings',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-attendance-setting',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-attendance-setting',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-attendance-setting',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-attendance-setting',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-attendance-setting',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-attendance-setting',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-attendance-setting',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-attendance-setting',
      },
    ],
  },
  roles: [
    'add-attendance-setting',
    'edit-attendance-setting',
    'remove-attendance-setting',
    'view-attendance-setting',
  ],
};
