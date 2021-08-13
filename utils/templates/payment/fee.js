const modelName = 'Fee';
const folder = 'finance/payment/fee';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/fees',
  model: [
    {
      field: 'month',
      type: 'enum',
      required: true,
      editable: true,
    },
    {
      field: 'payment_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'payments',
      },
    },
    {
      field: 'penalty',
      type: 'number',
      subtype: 'decimal',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
    {
      field: 'scholarship',
      type: 'number',
      subtype: 'decimal',
      required: false,
      editable: true,
      factory: 'faker.datatype.number({ min: 1000, max: 3000 })',
    },
  ],
  routes: {
    prefix: 'fees',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-fee',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-fee',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-fee',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-fee',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-fee',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-fee',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-fee',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-fee',
      },
    ],
  },
  roles: ['add-fee', 'edit-fee', 'remove-fee', 'view-fee'],
};
