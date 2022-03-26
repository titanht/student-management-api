import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import PenaltyConfig from './penaltyConfig';
import PenaltyConfigRepo from './penaltyConfigRepo';

export default class PenaltyConfigService extends Service<PenaltyConfig> {
  constructor() {
    super(new PenaltyConfigRepo());
  }

  async create(createData: PenaltyConfig, _auth: AuthContract) {
    const penaltyConfig = await this.repo.findFirst();
    if (!penaltyConfig) {
      return this.repo.createModel(createData);
    }

    return penaltyConfig as PenaltyConfig;
  }
}
