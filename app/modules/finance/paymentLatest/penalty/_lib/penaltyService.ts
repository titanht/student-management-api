import moment from 'moment';
import { PenaltyFrequency, PenaltyType } from '../../lib/payment-types';
import { Penalty } from '../penalty';

const PenaltyService = {
  getPenalty: (
    penalty: Penalty,
    basePayment: number,
    effectiveDate: moment.Moment,
    paymentDate: moment.Moment
  ): number => {
    if (!penalty.has_penalty) return 0;

    const diffDays = paymentDate.diff(effectiveDate, 'day');

    // console.log(diffDays, penalty.penalty_frequency);
    if (diffDays <= penalty.no_penalty_days || diffDays <= 0) return 0;

    const daysPastPenalty = Math.min(
      diffDays - penalty.no_penalty_days,
      penalty.max_penalty_apply_days
    );

    const totalPenalty =
      penalty.penalty_frequency === PenaltyFrequency.OneTime
        ? PenaltyService.getOneTime(penalty, basePayment)
        : PenaltyService.getRecurrent(penalty, daysPastPenalty, basePayment);

    return Math.min(totalPenalty, penalty.max_penalty);
  },

  getOneTime: (penalty: Penalty, basePayment: number): number => {
    return penalty.penalty_type === PenaltyType.Fixed
      ? penalty.penalty_amount
      : (basePayment * penalty.penalty_amount) / 100;
  },

  getRecurrent: (
    penalty: Penalty,
    daysPastNoPenalty: number,
    basePayment: number
  ): number => {
    const paymentCount = Math.ceil(
      daysPastNoPenalty / penalty.penalty_reapply_days
    );

    return paymentCount * PenaltyService.getOneTime(penalty, basePayment);
  },
};

export default PenaltyService;
