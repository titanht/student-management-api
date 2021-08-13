const modelName = 'RcyCst';
const folder = 'academic/marklist/reportCard/rcyCst';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/report-card/rcy-csts',
  model: [
    {
      field: 'cst_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'csts',
      },
    },
    {
      field: 'rcy_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'rcys',
      },
    },
  ],
  routes: {
    prefix: 'rcy-csts',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-rcy-cst',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-rcy-cst',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-rcy-cst',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-rcy-cst',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-rcy-cst',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-rcy-cst',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-rcy-cst',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-rcy-cst',
      },
    ],
  },
  roles: ['add-rcy-cst', 'edit-rcy-cst', 'remove-rcy-cst', 'view-rcy-cst'],
};
