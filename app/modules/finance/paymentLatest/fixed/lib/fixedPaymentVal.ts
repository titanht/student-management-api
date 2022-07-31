import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { PenaltyFrequency, PenaltyType } from '../fixedPayment';

export class FixedPaymentCreateVal extends Validator {
  public schema = schema.create({
    effective_date: schema.date(),
    end_date: schema.date(
      {
        format: 'yyyy-mm-dd',
      },
      [rules.afterField('effective_date')]
    ),
    amount: schema.number([rules.unsigned()]),
    description: schema.string({}, [
      rules.unique({
        table: 'fixed_payments',
        column: 'description',
      }),
    ]),
    has_penalty: schema.boolean(),
    no_penalty_days: schema.number.optional([rules.unsigned()]),
    penalty_type: schema.enum.optional(Object.values(PenaltyType)),
    penalty_amount: schema.number.optional(),
    penalty_frequency: schema.enum.optional(Object.values(PenaltyFrequency)),
    penalty_reapply_days: schema.number.optional([rules.unsigned()]),
    max_penalty: schema.number.optional([rules.unsigned()]),
    max_penalty_apply_days: schema.number.optional([rules.unsigned()]),
  });
}
