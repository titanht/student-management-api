import { validator } from '@ioc:Adonis/Core/Validator';
import FixedPaymentPendingService from 'app/modules/finance/paymentLatest/fixed/fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedStudentPaymentService from 'app/modules/finance/paymentLatest/fixed/fixedStudentPayment/lib/fixedStudentPaymentService';
import { CustomRules } from 'app/modules/_shared/types';

const ruleMap: Record<CustomRules, (d: any, root: any) => Promise<boolean>> = {
  fixedStudentNotInPending: FixedPaymentPendingService.studentInPending,
  fixedStudentNotPaid: FixedStudentPaymentService.studentPaid,
};

validator.rule(
  'custom',
  async (value, arg: [CustomRules, string], options) => {
    const [ruleKey, message] = arg;

    if (await ruleMap[ruleKey](value, options.root)) {
      options.errorReporter.report(
        options.pointer,
        'custom',
        message,
        options.arrayExpressionPointer
      );
    }
  },
  () => ({
    async: true,
  })
);
