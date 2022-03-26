import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export enum PenaltyType {
  NoPenalty = 'NO_PENALTY',
  Fixed = 'FIXED',
  Incrementing = 'INCREMENTING',
  FixedAndIncrementing = 'FIXED_AND_INCREMENTING',
}

export default class PenaltyConfig extends Model {
  @column()
  public deadline_days: number;

  @column()
  public fixed_penalty_days: number;

  @column()
  public fixed_penalty_fee: number;

  @column()
  public incrementing_penalty_fee: number;

  @column()
  public incrementing_penalty_days: number;

  @column()
  public type: PenaltyType;

  @column()
  public max_fee: number;
}
