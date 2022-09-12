import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import HrtService from './_lib/hrt-service';

export default class HrtController {
  async store({ request, response }: HttpContextContract) {
    const hrt = await HrtService.assign(request);

    response.json({ data: { hrt } });
  }

  async removeHrt({ request, response }: HttpContextContract) {
    const { id } = request.params();
    await HrtService.delete(id);

    response.json({ data: true });
  }
}
