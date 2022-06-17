import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class TestController {
  async test({}: HttpContextContract) {
    return 'test';
  }

  async test2({ request, params }: HttpContextContract) {
    return { par: request.params(), bod: request.body(), params };
  }
}
