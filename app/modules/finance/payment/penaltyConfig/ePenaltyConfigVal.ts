import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class EPenaltyConfigVal extends Validator {
  public schema = schema.create({
    deadline_days: schema.number.optional(),
    fixed_penalty_days: schema.number.optional(),
    fixed_penalty_fee: schema.number.optional(),
    incrementing_penalty_fee: schema.number.optional(),
    incrementing_penalty_days: schema.number.optional(),
  });
}
