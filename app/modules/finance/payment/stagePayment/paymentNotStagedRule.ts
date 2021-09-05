import { validator } from '@ioc:Adonis/Core/Validator';
import { Months, PaymentType } from '../payment';
import StagePaymentRepo from './stagePaymentRepo';

export type FeeNotStagedArgs = {
  paymentType: PaymentType;
  addMonth: boolean;
};

export default () => {
  validator.rule(
    'paymentNotStaged',
    async (value, _compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const [{ paymentType, addMonth }] =
        _compiledOptions as FeeNotStagedArgs[];
      const { errorReporter, arrayExpressionPointer, pointer, root } = options;

      const staged = await new StagePaymentRepo().paymentStaged(
        root.student_id || '',
        paymentType,
        addMonth ? (root.month as Months) : null
      );

      if (staged) {
        errorReporter.report(
          pointer,
          'paymentNotStaged',
          'payment already staged',
          arrayExpressionPointer
        );
      }
    },
    (_options) => {
      return {
        async: true,
      };
    }
  );
};
