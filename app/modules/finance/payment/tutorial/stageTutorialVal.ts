import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import CPaymentVal from '../cPaymentVal';
import { Months, PaymentType } from '../payment';

export default class StageTutorialVal extends Validator {
  public schema = schema.create({
    ...CPaymentVal.paymentRules,
    month: schema.enum(Object.values(Months), [
      rules.monthTutorialNotPaid(),
      rules.paymentNotStaged({
        paymentType: PaymentType.Tutorial,
        addMonth: true,
      }),
    ]),
  });
}
