const modelName = 'Payment';
const folder = 'finance/payment';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment',
  model: [
    {
      field: 'fee',
      type: 'number',
      subtype: 'decimal',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'attachment',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'fs',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'cash',
      type: 'number',
      subtype: 'decimal',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
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
      field: 'academic_year_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: false,
      foreign: {
        column: 'id',
        table: 'academic_years',
      },
    },
    {
      field: 'hidden',
      type: 'boolean',
      required: false,
      editable: true,
    },
    {
      field: 'slip_date',
      type: 'date',
      required: false,
      editable: true,
    },
    {
      field: 'remark',
      type: 'string',
      required: false,
      editable: true,
    },
  ],
  routes: {
    prefix: 'payments',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-payment',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-payment',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-payment',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-payment',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-payment',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-payment',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-payment',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-payment',
      },
    ],
  },
  roles: ['add-payment', 'edit-payment', 'remove-payment', 'view-payment'],
};
