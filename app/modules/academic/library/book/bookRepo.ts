import { Repo } from 'app/modules/_shared/repo';
import Book from './book';

export default class BookRepo extends Repo<Book> {
  constructor() {
    super(Book);
  }
}
