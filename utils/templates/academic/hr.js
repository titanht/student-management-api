const modelName = 'Hrt';
const folder = 'academic/homeRoom/hrt';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/home-room/hrt',
  model: [
    {
      field: 'grade_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'grades',
      },
    },
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
    prefix: 'hrts',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-hrt',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-hrt',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-hrt',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-hrt',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-hrt',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-hrt',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-hrt',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-hrt',
      },
    ],
  },
  roles: ['add-hrt', 'edit-hrt', 'remove-hrt', 'view-hrt'],
};
