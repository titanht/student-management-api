const modelName = 'Sml';
const folder = 'academic/marklist/sml';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/smls',
  model: [
    {
      field: 'evaluation_method_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'evaluation_methods',
      },
    },
    {
      field: 'grade_student_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'grade_students',
      },
    },
    {
      field: 'score',
      type: 'number',
      subtype: 'float',
      required: true,
      editable: true,
    },
    {
      field: 'finalized',
      type: 'boolean',
      required: true,
      editable: true,
    },
    {
      field: 'finalize_date',
      type: 'date',
      editable: true,
    },
  ],
  routes: {
    prefix: 'smls',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-sml',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-sml',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-sml',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-sml',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-sml',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-sml',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-sml',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-sml',
      },
    ],
  },
  roles: ['add-sml', 'edit-sml', 'remove-sml', 'view-sml'],
};
