const modelName = 'RcsCst';
const folder = 'academic/marklist/reportCard/rcsCst';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/report-card/rcs-csts',
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
      field: 'rcs_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'rcss',
      },
    },
  ],
  routes: {
    prefix: 'rcs-csts',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-rcs-cst',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-rcs-cst',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-rcs-cst',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-rcs-cst',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-rcs-cst',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-rcs-cst',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-rcs-cst',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-rcs-cst',
      },
    ],
  },
  roles: ['add-rcs-cst', 'edit-rcs-cst', 'remove-rcs-cst', 'view-rcs-cst'],
};
