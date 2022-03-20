import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Application from '@ioc:Adonis/Core/Application';
import { v4 } from 'uuid';
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

  // TODO: Refactor to service class
  async store({ request, response, auth }: HttpContextContract) {
    // console.log('Auth IN apiController', !!auth.user);
    let data;
    if (this.apiValidators && this.apiValidators.createValidator) {
      data = await request.validate(this.apiValidators.createValidator as any);
    }

    const storagePath = Application.publicPath('images', v4());
    const img = request.file('img');
    let imgPath = '';
    if (img) {
      await img.move(storagePath);
      imgPath = img.filePath?.replace(Application.publicPath(), '') || '';
    }
    delete data.img;

    const newData = await this.service.create(
      { ...data, img_path: imgPath },
      auth
    );
    // const newData = {};

    return response.status(201).json(newData);
  }
}
