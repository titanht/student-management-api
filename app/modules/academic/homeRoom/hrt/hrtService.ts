import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import Hrt from './hrt';
import HrtRepo from './hrtRepo';

export default class HrtService extends Service<Hrt> {
  constructor() {
    super(new HrtRepo());
  }

  async fetchGrade(auth: AuthContract) {
    return (this.repo as HrtRepo).fetchGrade(auth.user?.id);
  }
}
