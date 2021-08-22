import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Tutorial from './tutorial';
import TutorialService, { TutorialData } from './tutorialService';
import CTutorialVal from './cTutorialVal';
import ETutorialVal from './eTutorialVal';

export default class TutorialController extends ApiController<Tutorial> {
  constructor(protected service = new TutorialService()) {
    super(service, {
      createValidator: CTutorialVal,
      editValidator: ETutorialVal,
    });
  }

  async stage({ request, response }: HttpContextContract) {
    const data = await request.validate(CTutorialVal);
    await this.service.stage(data as TutorialData);

    return response.status(201).json({ data: true });
  }
}
