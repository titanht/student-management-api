const modelName = 'UserBookLoan';
const folder = 'academic/library/userBookLoan';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/library/user-book-loans',
  model: [
    {
      field: 'title',
      type: 'string',
      required: true,
      editable: true,
    },
    {
      field: 'code',
      type: 'string',
      required: true,
      editable: true,
      unique: true,
    },
    {
      field: 'description',
      type: 'string',
      subtype: 'text',
      required: true,
      editable: true,
    },
    {
      field: 'author',
      type: 'string',
      required: true,
      editable: true,
    },
    {
      field: 'genre',
      type: 'string',
      required: true,
      editable: true,
    },
    {
      field: 'date_to_be_returned',
      type: 'date',
      required: true,
      editable: true,
    },
    {
      field: 'date_returned',
      type: 'date',
      required: true,
      editable: true,
    },
    {
      field: 'quantity',
      type: 'number',
      subtype: 'integer',
      required: true,
      editable: true,
    },
    {
      field: 'loaned_count',
      type: 'number',
      subtype: 'integer',
      required: false,
      default: 0,
      editable: true,
    },
    {
      field: 'remark',
      type: 'string',
      required: false,
      editable: true,
    },
  ],
  routes: {
    prefix: 'user-book-loans',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-user-book-loan',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-user-book-loan',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-user-book-loan',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-user-book-loan',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-user-book-loan',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-user-book-loan',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-user-book-loan',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-user-book-loan',
      },
    ],
  },
  roles: [
    'add-user-book-loan',
    'edit-user-book-loan',
    'remove-user-book-loan',
    'view-user-book-loan',
  ],
};
