import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';
import LastOpRepo from './lastOpRepo';

export class LastOpException extends Exception {
  constructor(message: string = 'Invalid request, check your computer time') {
    super(message, 500);
  }
}

const repo = new LastOpRepo();

export default class LastOpMiddleware {
  public async handle(_ctx: HttpContextContract, next: () => Promise<void>) {
    const invalid = await repo.isInvalid();

    // Logger.error('DATE_ERROR');
    if (invalid) {
      throw new LastOpException();
    }

    await repo.updateTimestamp();
    await next();
  }
}
