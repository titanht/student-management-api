const modelName = 'PenaltyConfig';
const folder = 'finance/payment/penaltyConfig';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/finance/payment/penalty-configs',
  model: [
    {
      field: 'deadline_days',
      type: 'number',
      required: true,
      editable: true,
    },
    {
      field: 'fixed_penalty_days',
      type: 'number',
      required: true,
      editable: true,
    },
    {
      field: 'fixed_penalty_fee',
      type: 'number',
      subtype: 'decimal',
      required: true,
      editable: true,
    },
    {
      field: 'incrementing_penalty_fee',
      type: 'number',
      subtype: 'decimal',
      required: true,
      editable: true,
    },
    {
      field: 'incrementing_penalty_days',
      type: 'number',
      required: true,
      editable: true,
    },
  ],
  routes: {
    prefix: 'penalty-configs',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-penalty-config',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-penalty-config',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-penalty-config',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-penalty-config',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-penalty-config',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-penalty-config',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-penalty-config',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-penalty-config',
      },
    ],
  },
  roles: ['add-fee', 'edit-fee', 'remove-fee', 'view-fee'],
};
