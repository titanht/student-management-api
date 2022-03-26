import Service from 'app/modules/_shared/service';
import Book from './book';
import BookRepo from './bookRepo';

export default class BookService extends Service<Book> {
  constructor() {
    super(new BookRepo());
  }
}
