const modelName = 'Other';
const folder = 'finance/payment/other';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/others',
  model: [
    {
      field: 'reason',
      type: 'string',
      subtype: 'text',
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
  ],
  routes: {
    prefix: 'others',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-other',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-other',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-other',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-other',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-other',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-other',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-other',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-other',
      },
    ],
  },
  roles: ['add-other', 'edit-other', 'remove-other', 'view-other'],
};
