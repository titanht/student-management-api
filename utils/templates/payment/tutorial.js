const modelName = 'Tutorial';
const folder = 'finance/payment/tutorial';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/tutorials',
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
  ],
  routes: {
    prefix: 'tutorials',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-tutorial',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-tutorial',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-tutorial',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-tutorial',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-tutorial',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-tutorial',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-tutorial',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-tutorial',
      },
    ],
  },
  roles: ['add-tutorial', 'edit-tutorial', 'remove-tutorial', 'view-tutorial'],
};
