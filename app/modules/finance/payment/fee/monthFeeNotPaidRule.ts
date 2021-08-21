import { validator } from '@ioc:Adonis/Core/Validator';
import FeeRepo from './feeRepo';

export default () => {
  validator.rule(
    'monthFeeNotPaid',
    async (value, _compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const { errorReporter, arrayExpressionPointer, pointer, root } = options;

      const paid = await new FeeRepo().monthPaid(
        root.student_id || '',
        root.month || ''
      );

      if (paid) {
        errorReporter.report(
          pointer,
          'monthFeeNotPaid',
          'fee already paid for this month',
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
