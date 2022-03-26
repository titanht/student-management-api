import { DateTime } from 'luxon';
import moment from 'moment';
import Model from '../_shared/model';
import { Repo } from '../_shared/repo';
import LastOp from './lastOp';

const TOLERANCE_SECONDS = -5;

export default class LastOpRepo extends Repo<LastOp> {
  constructor() {
    super(LastOp);
  }

  async updateTimestamp() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const lastOp = (await this.model.first()) as LastOp;
    if (!lastOp) {
      await this.model.create({
        last_log: date,
      } as unknown as Model);
    } else {
      lastOp.last_log = date as unknown as DateTime;
      await lastOp.save();
    }
  }

  async isInvalid() {
    const lastOp = (await this.model.first()) as LastOp;
    if (!lastOp) {
      return false;
    }

    const lastLog = moment(lastOp.last_log, 'YYYY-MM-DD HH:mm:ss');
    const now = moment();
    const diff = now.diff(lastLog) / 1000;

    return diff < TOLERANCE_SECONDS;
  }
}
