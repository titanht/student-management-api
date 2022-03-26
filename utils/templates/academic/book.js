const modelName = 'Book';
const folder = 'academic/library/book';
const rootFolder = `app/modules/${folder}`;

module.exports = {
  modelName,
  folder,
  rootFolder,
  apiUrl: '/academic/library/books',
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
      field: 'year',
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
    prefix: 'books',
    map: [
      {
        method: 'post',
        path: '/',
        handleFunction: 'store',
        permission: 'add-book',
      },
      {
        method: 'post',
        path: '/search',
        handleFunction: 'search',
        permission: 'add-book',
      },
      {
        method: 'get',
        path: '/',
        handleFunction: 'index',
        permission: 'view-book',
      },
      {
        method: 'get',
        path: '/paginate',
        handleFunction: 'paginate',
        permission: 'view-book',
      },
      {
        method: 'get',
        path: '/:id',
        handleFunction: 'show',
        permission: 'view-book',
      },
      {
        method: 'patch',
        path: '/:id',
        handleFunction: 'update',
        permission: 'edit-book',
      },
      {
        method: 'delete',
        path: '/:id',
        handleFunction: 'delete',
        permission: 'remove-book',
      },
      {
        method: 'post',
        path: '/show/:id',
        handleFunction: 'showDetail',
        permission: 'view-book',
      },
    ],
  },
  roles: ['add-book', 'edit-book', 'remove-book', 'view-book'],
};
