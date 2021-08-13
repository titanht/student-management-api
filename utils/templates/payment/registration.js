const modelName = 'Registration';
const folder = 'finance/payment/registration';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/registrations',
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
    prefix: 'registrations',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-registration',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-registration',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-registration',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-registration',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-registration',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-registration',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-registration',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-registration',
      },
    ],
  },
  roles: [
    'add-registration',
    'edit-registration',
    'remove-registration',
    'view-registration',
  ],
};
