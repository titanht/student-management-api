import PenaltyConfig, { PenaltyType } from '../penaltyConfig/penaltyConfig';

export class PenaltyCalculator {
  constructor(protected rule: PenaltyConfig) {}

  calculatePenalty(days: number) {
    let penalty = 0;

    // console.log(days, this.rule.deadline_days);
    if (
      this.rule &&
      this.rule.type !== PenaltyType.NoPenalty &&
      days > this.rule.deadline_days
    ) {
      // console.log(this.rule.type);
      if (this.rule.type === PenaltyType.Fixed) {
        penalty = this.calculateFixed();
      } else if (this.rule.type === PenaltyType.Incrementing) {
        penalty = this.calculateIncrementing(days);
      } else {
        penalty = this.calculateFixedIncrementing(days);
      }
    }

    return penalty;
  }

  calculateFixed() {
    return this.rule.fixed_penalty_fee;
  }

  calculateIncrementing(days) {
    const rate =
      this.rule.incrementing_penalty_fee / this.rule.incrementing_penalty_days;

    return (days - this.rule.deadline_days) * rate;
  }

  calculateFixedIncrementing(days) {
    let total = this.rule.fixed_penalty_fee;

    const rate =
      this.rule.incrementing_penalty_fee / this.rule.incrementing_penalty_days;
    const incDays =
      days - this.rule.deadline_days - this.rule.fixed_penalty_days;

    if (incDays > 0) {
      total += incDays * rate;
    }

    return total;
  }
}
