import Book from 'app/modules/academic/library/book/book';
import test from 'japa';
import { BookFactory } from './bookFactory';
import { ApiMethod, transact } from 'app/test/testUtils';
import {
  createsApi,
  deleteApi,
  indexApi,
  paginateApi,
  requiresAuth,
  requiresAuthorization,
  showApi,
  updatesApi,
  validateApi,
} from 'app/test/testUtils/api';

const apiUrl = '/academic/library/books';
const roles = ['add-book', 'edit-book', 'remove-book', 'view-book'];

const factory = BookFactory;

transact('Book show', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.GET));
  test('/:id', async () => {
    const data = await factory.create();
    return showApi({
      url: apiUrl,
      roles,
      data,
      model: Book,
    });
  });
});

transact('Book paginate', () => {
  test('auth', requiresAuth(`${apiUrl}/paginate`, ApiMethod.GET));
  test('authorize', requiresAuthorization(`${apiUrl}/paginate`, ApiMethod.GET));
  test('/?', async () => {
    const data = await factory.create();
    return paginateApi({
      url: apiUrl,
      roles,
      data,
      model: Book,
    });
  });
});

transact('Book index', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.GET));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.GET));
  test('/', async () => {
    const data = await factory.create();
    return indexApi({
      url: apiUrl,
      roles,
      data,
      model: Book,
    });
  });
});

transact('Book create', () => {
  test('auth', requiresAuth(apiUrl, ApiMethod.POST));
  test('authorize', requiresAuthorization(apiUrl, ApiMethod.POST));
  test(
    'validate',
    validateApi(apiUrl, roles, {
      title: 'required validation failed',
      code: 'required validation failed',
      description: 'required validation failed',
      author: 'required validation failed',
      genre: 'required validation failed',
      year: 'required validation failed',
      quantity: 'required validation failed',
    })
  );
  test('store', async () => {
    const data = await factory.create();
    await data.delete();

    return createsApi({
      url: apiUrl,
      roles,
      data: { ...data.serialize() },
      model: Book,
      assertionData: {},
    });
  });
});

transact('Book update', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.PATCH));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.PATCH));
  test(
    'validate',
    validateApi(
      `${apiUrl}/id`,
      roles,
      {
        title: 'string validation failed',
        code: 'string validation failed',
        description: 'string validation failed',
        author: 'string validation failed',
        genre: 'string validation failed',
        year: 'year must be date',
        quantity: 'number validation failed',
        loaned_count: 'number validation failed',
        remark: 'string validation failed',
      },
      {
        title: 100,
        code: 100,
        description: 100,
        author: 100,
        genre: 100,
        year: 1,
        quantity: 'some data',
        loaned_count: 'some data',
        remark: 100,
      },
      ApiMethod.PATCH
    )
  );
  test('update', async () => {
    const itemF = await factory.create();
    const item = (await Book.findOrFail(itemF.id)).serialize();
    const updateF = await factory.create();
    const updateData = (await Book.findOrFail(updateF.id)).serialize();
    await updateF.delete();

    return updatesApi({
      url: apiUrl,
      roles: roles,
      model: Book,
      item,
      updateData,
      updateFields: [
        'title',
        'code',
        'description',
        'author',
        'genre',
        'year',
        'quantity',
        'loaned_count',
        'remark',
      ],
      assertionData: {},
    });
  });
});

transact('Book delete', () => {
  test('auth', requiresAuth(`${apiUrl}/id`, ApiMethod.DELETE));
  test('authorize', requiresAuthorization(`${apiUrl}/id`, ApiMethod.DELETE));
  test('delete', async () => {
    const items = await factory.createMany(2);

    return deleteApi({
      url: apiUrl,
      roles,
      model: Book,
      itemId: items[0].id,
    });
  });
});
