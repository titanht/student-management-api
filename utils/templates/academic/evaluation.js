const modelName = 'EvaluationMethod';
const folder = 'academic/marklist/evaluationMethod';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/evaluation-methods',
  model: [
    {
      field: 'evaluation_type_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'evaluation_types',
      },
    },
    {
      field: 'quarter_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'quarters',
      },
    },
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
  ],
  routes: {
    prefix: 'evaluation-methods',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-evaluation-method',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-evaluation-method',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-evaluation-method',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-evaluation-method',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-evaluation-method',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-evaluation-method',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-evaluation-method',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-evaluation-method',
      },
    ],
  },
  roles: [
    'add-evaluation-method',
    'edit-evaluation-method',
    'remove-evaluation-method',
    'view-evaluation-method',
  ],
};
