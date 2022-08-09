declare module '@ioc:Adonis/Core/Validator' {
  import { CustomRules } from 'app/modules/_shared/types';

  import { Rule } from '@ioc:Adonis/Core/Validator';
  import { UniqueCompoundArg } from 'app/modules/_shared/validation/uniqueCompound';

  import { NotRegisteredArg } from 'app/modules/finance/payment/registration/notRegisteredRule';
  import { FeeNotStagedArgs } from 'app/modules/finance/payment/stagePayment/paymentNotStagedRule';
  import { NotRegisteredPaymentArg } from 'app/modules/finance/paymentNew/registrationPayment/notRegisteredPaymentRule';

  interface Rules {
    gt(options: number): Rule;
    uniqueCompound(options: UniqueCompoundArg): Rule; // 👈

    // Academic
    total100();

    // Fee
    notRegistered(options: NotRegisteredArg): Rule;
    monthFeeNotPaid(): Rule;
    monthTutorialNotPaid(): Rule;
    notSummerPaid(): Rule;
    paymentNotStaged(options: FeeNotStagedArgs): Rule;
    notRegisteredPayment(options: NotRegisteredPaymentArg): Rule;
    custom(validator: CustomRules, msg: string): Rule;
  }
}
