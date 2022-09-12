import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserService from 'app/modules/user/_lib/user-service';
import HrtService from './_lib/hrt-service';

export default class HrtController {
  async store({ request, response }: HttpContextContract) {
    const hrt = await HrtService.assign(request);

    response.json(hrt);
  }

  async removeHrt({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await HrtService.delete(id);

    response.json({ data: true });
  }

  async getNonHrts({ response }: HttpContextContract) {
    const users = await UserService.findNonHrts();

    response.json(users);
  }
}
