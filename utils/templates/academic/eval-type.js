const modelName = 'EvaluationType';
const folder = 'academic/marklist/evaluationType';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/evaluation-types',
  model: [
    {
      field: 'name',
      type: 'string',
      required: true,
      editable: true,
      unique: true,
    },
    {
      field: 'weight',
      type: 'number',
      subtype: 'float',
      required: true,
      editable: true,
    },
  ],
  routes: {
    prefix: 'evaluation-types',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-evaluation-type',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-evaluation-type',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-evaluation-type',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-evaluation-type',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-evaluation-type',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-evaluation-type',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-evaluation-type',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-evaluation-type',
      },
    ],
  },
  roles: [
    'add-evaluation-type',
    'edit-evaluation-type',
    'remove-evaluation-type',
    'view-evaluation-type',
  ],
};
