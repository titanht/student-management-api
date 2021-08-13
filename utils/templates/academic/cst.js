const modelName = 'Cst';
const folder = 'academic/marklist/cst';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/csts',
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
      field: 'subject_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'subjects',
      },
    },
    {
      field: 'teacher_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'teachers',
      },
    },
    {
      field: 'academic_year_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'academic_years',
      },
    },
    {
      field: 'count',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
    },
  ],
  routes: {
    prefix: 'csts',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-cst',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-cst',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-cst',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-cst',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-cst',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-cst',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-cst',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-cst',
      },
    ],
  },
  roles: ['add-cst', 'edit-cst', 'remove-cst', 'view-cst'],
};
