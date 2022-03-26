import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { PenaltyType } from './penaltyConfig';

export default class CPenaltyConfigVal extends Validator {
  public schema = schema.create({
    deadline_days: schema.number([rules.unsigned()]),
    fixed_penalty_days: schema.number([rules.unsigned()]),
    fixed_penalty_fee: schema.number(),
    incrementing_penalty_fee: schema.number(),
    incrementing_penalty_days: schema.number([rules.unsigned()]),
    type: schema.enum(Object.values(PenaltyType)),
    max_fee: schema.number(),
  });
}
