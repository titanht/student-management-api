const modelName = 'Student';
const folder = 'academic/student';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/students',
  model: [
    {
      field: 'first_name',
      type: 'string',
      required: true,
      editable: true,
    },
    {
      field: 'father_name',
      type: 'string',
      required: true,
      editable: true,
    },
    {
      field: 'gender',
      type: 'enum',
      required: true,
      editable: true,
    },
    {
      field: 'grand_father_name',
      type: 'string',
      editable: true,
    },
    {
      field: 'id_number',
      type: 'string',
      editable: true,
    },
    {
      field: 'primary_phone',
      type: 'string',
      editable: true,
    },
    {
      field: 'img',
      type: 'string',
      subtype: 'long',
      editable: true,
    },
    {
      field: 'scholarship_amount',
      type: 'number',
      subtype: 'decimal',
      editable: true,
      default: 0,
    },
  ],
  routes: {
    prefix: 'students',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-student',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-student',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-student',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-student',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-student',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-student',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-student',
      },
    ],
  },
  roles: ['add-student', 'edit-student', 'remove-student', 'view-student'],
};
