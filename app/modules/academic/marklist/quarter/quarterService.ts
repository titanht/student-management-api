import Service from 'app/modules/_shared/service';
import Quarter from './quarter';
import QuarterRepo from './quarterRepo';

export default class QuarterService extends Service<Quarter> {
  constructor() {
    super(new QuarterRepo());
  }
}
