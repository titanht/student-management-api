import { Repo } from 'app/modules/_shared/repo';
import Tutorial from './tutorial';

export default class TutorialRepo extends Repo<Tutorial> {
  constructor() {
    super(Tutorial);
  }
}
