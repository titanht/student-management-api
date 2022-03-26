const modelName = 'Penalty';
const folder = 'finance/payment/penalty';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/penalties',
  model: [],
  routes: {
    prefix: 'penalties',
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
