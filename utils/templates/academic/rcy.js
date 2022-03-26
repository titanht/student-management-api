const modelName = 'Rcy';
const folder = 'academic/marklist/reportCard/rcy';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/report-card/rcys',
  model: [
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
      field: 'total_score',
      type: 'number',
      subtype: 'float',
      required: true,
      editable: true,
    },
    {
      field: 'average',
      type: 'number',
      subtype: 'float',
      required: true,
      editable: true,
    },
    {
      field: 'subject_count',
      type: 'number',
      subtype: 'integer',
      editable: true,
    },
    {
      field: 'rank',
      type: 'number',
      subtype: 'integer',
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
    prefix: 'rcys',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-rcy',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-rcy',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-rcy',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-rcy',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-rcy',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-rcy',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-rcy',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-rcy',
      },
    ],
  },
  roles: ['add-rcy', 'edit-rcy', 'remove-rcy', 'view-rcy'],
};
