const modelName = 'StagePayment';
const folder = 'finance/payment/stagePayment';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/stage-payments',
  model: [
    {
      field: 'data',
      type: 'string',
      subtype: 'text',
      required: true,
    },
    {
      field: 'type',
      type: 'enum',
      required: true,
    },
  ],
  routes: {
    prefix: 'stage-payments',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-stage-payment',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-stage-payment',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-stage-payment',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-stage-payment',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-stage-payment',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-stage-payment',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-stage-payment',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-stage-payment',
      },
    ],
  },
  roles: [
    'add-stage-payment',
    'edit-stage-payment',
    'remove-stage-payment',
    'view-stage-payment',
  ],
};
