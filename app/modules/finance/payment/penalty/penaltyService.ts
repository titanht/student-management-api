import moment from 'moment';
import { getEthiopianYear } from 'app/services/utils/timeUtils';
import { Months } from '../payment';
import * as timeUtils from '../../../../services/utils/timeUtils';
import PenaltyConfig from '../penaltyConfig/penaltyConfig';
import { PenaltyCalculator } from './penaltyCalculator';

export default class PenaltyService {
  async calculatePenalty(month: Months, endTime: string | null = null) {
    const months = Object.values(Months);
    if (!months.includes(month)) {
      throw new Error('Invalid month value');
    }

    if (!endTime) {
      endTime = moment(new Date()).format('YYYY-M-D');
    }

    const etYear = timeUtils.getEthiopianYear();
    const etMonth = months.indexOf(month) + 1;
    const etDay = 1;

    const startTime = timeUtils
      .convertToGregorian(etYear, etMonth, etDay)
      .join('-');

    const rule = await PenaltyConfig.firstOrFail();
    const calculator = new PenaltyCalculator(rule);
    const days =
      moment(endTime, 'YYYY-M-D').diff(moment(startTime, 'YYYY-M-D')) /
      (24 * 3600 * 1000);
    let penalty = calculator.calculatePenalty(days);
    if (penalty > rule.max_fee) {
      penalty = rule.max_fee;
    }

    return penalty;
  }

  async getPenaltySlip(month, slipDate) {
    return this.calculatePenalty(month, slipDate);
  }

  async getPenaltyCurrent(month) {
    return this.calculatePenalty(month);
  }
}
