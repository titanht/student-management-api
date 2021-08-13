const modelName = 'Teacher';
const folder = 'academic/teacher';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/teachers',
  model: [
    {
      field: 'user_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'users',
      },
    },
  ],
  routes: {
    prefix: 'teachers',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-teacher',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-teacher',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-teacher',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-teacher',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-teacher',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-teacher',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-teacher',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-teacher',
      },
    ],
  },
  roles: ['add-teacher', 'edit-teacher', 'remove-teacher', 'view-teacher'],
};
