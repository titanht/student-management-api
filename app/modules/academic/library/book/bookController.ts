import ApiController from 'app/modules/_shared/apiController';
import Book from './book';
import BookService from './bookService';
import CBookVal from './cBookVal';
import EBookVal from './eBookVal';

export default class BookController extends ApiController<Book> {
  constructor(protected service = new BookService()) {
    super(service, {
      createValidator: CBookVal,
      editValidator: EBookVal,
    });
  }
}
