const modelName = 'UserAttendance';
const folder = 'hr/attendance';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/hr/attendances',
  model: [
    {
      field: 'date',
      type: 'date',
      required: true,
      editable: true,
    },
    {
      field: 'day_week',
      type: 'number',
      subtype: 'integer',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'week_year',
      type: 'number',
      subtype: 'integer',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'month',
      type: 'number',
      subtype: 'integer',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'time_in',
      type: 'string',
      subtype: 'text',
      required: false,
      editable: true,
      factory: '00:00',
    },
    {
      field: 'time_out',
      type: 'string',
      subtype: 'text',
      required: false,
      editable: true,
      factory: '00:00',
    },
    {
      field: 'present_in',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'present_out',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'late_in',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'early_out',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'only_in',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'only_out',
      type: 'boolean',
      required: false,
      editable: true,
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
    prefix: 'attendances',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-user-attendance',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-user-attendance',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-user-attendance',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-user-attendance',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-user-attendance',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-user-attendance',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-user-attendance',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-user-attendance',
      },
    ],
  },
  roles: [
    'add-user-attendance',
    'edit-user-attendance',
    'remove-user-attendance',
    'view-user-attendance',
  ],
};
