const modelName = 'Summer';
const folder = 'finance/payment/summer';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/summers',
  model: [
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
    prefix: 'summers',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-summer',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-summer',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-summer',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-summer',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-summer',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-summer',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-summer',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-summer',
      },
    ],
  },
  roles: ['add-summer', 'edit-summer', 'remove-summer', 'view-summer'],
};
