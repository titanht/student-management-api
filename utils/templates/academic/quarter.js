const modelName = 'Quarter';
const folder = 'academic/marklist/quarter';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/quarters',
  model: [
    {
      field: 'quarter',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
    },
    {
      field: 'semester_id',
      type: 'string',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'semesters',
      },
    },
  ],
  routes: {
    prefix: 'quarters',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-quarter',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-quarter',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-quarter',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-quarter',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-quarter',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-quarter',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-quarter',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-quarter',
      },
    ],
  },
  roles: ['add-quarter', 'edit-quarter', 'remove-quarter', 'view-quarter'],
};
