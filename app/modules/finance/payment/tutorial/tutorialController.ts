import ApiController from 'app/modules/_shared/apiController';
import Tutorial from './tutorial';
import TutorialService from './tutorialService';
import CTutorialVal from './cTutorialVal';
import ETutorialVal from './eTutorialVal';

export default class TutorialController extends ApiController<Tutorial> {
  constructor(protected service = new TutorialService()) {
    super(service, {
      createValidator: CTutorialVal,
      editValidator: ETutorialVal,
    });
  }
}
