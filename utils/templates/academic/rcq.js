const modelName = 'Rcq';
const folder = 'academic/marklist/reportCard/rcq';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/report-card/rcqs',
  model: [
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
    prefix: 'rcqs',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-rcq',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-rcq',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-rcq',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-rcq',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-rcq',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-rcq',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-rcq',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-cst',
      },
    ],
  },
  roles: ['add-rcq', 'edit-rcq', 'remove-rcq', 'view-rcq'],
};
