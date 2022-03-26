const modelName = 'Rcs';
const folder = 'academic/marklist/reportCard/rcs';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/marklist/report-card/rcss',
  model: [
    {
      field: 'semester_id',
      type: 'string',
      subtype: 'uuid',
      required: true,
      editable: true,
      foreign: {
        column: 'id',
        table: 'semesters',
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
    prefix: 'rcss',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-rcs',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-rcs',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-rcs',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-rcs',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-rcs',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-rcs',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-rcs',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-cst',
      },
    ],
  },
  roles: ['add-rcs', 'edit-rcs', 'remove-rcs', 'view-rcs'],
};
