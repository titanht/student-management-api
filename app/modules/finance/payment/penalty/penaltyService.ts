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
    let parsedEndTime: number[];

    if (endTime) {
      parsedEndTime = endTime.split('-').map((i) => parseInt(i, 10));
    } else {
      const end = moment();
      parsedEndTime = [end.year(), end.month(), end.date()];
    }

    const etYear = timeUtils.getEthiopianYear();
    const etMonth = months.indexOf(month);
    const etDay = 1;

    const startTime = timeUtils.convertToGregorian(etYear, etMonth, etDay);

    const rule = await PenaltyConfig.firstOrFail();
    const calculator = new PenaltyCalculator(rule);
    const days = timeUtils.getDayDiff(parsedEndTime, startTime);

    let penalty = calculator.calculatePenalty(days);
    console.log({ days, endTime, startTime, penalty });
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
