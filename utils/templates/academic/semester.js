const modelName = 'Semester';
const folder = 'academic/marklist/semester';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/semesters',
  model: [
    {
      field: 'semester',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
    },
  ],
  routes: {
    prefix: 'semesters',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-semester',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-semester',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-semester',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-semester',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-semester',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-semester',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-semester',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-semester',
      },
    ],
  },
  roles: ['add-semester', 'edit-semester', 'remove-semester', 'view-semester'],
};
