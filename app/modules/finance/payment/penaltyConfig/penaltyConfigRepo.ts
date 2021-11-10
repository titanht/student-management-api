import { Repo } from 'app/modules/_shared/repo';
import PenaltyConfig from './penaltyConfig';

export default class PenaltyConfigRepo extends Repo<PenaltyConfig> {
  constructor() {
    super(PenaltyConfig);
  }
}
