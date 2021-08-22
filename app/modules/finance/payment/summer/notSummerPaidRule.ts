import { validator } from '@ioc:Adonis/Core/Validator';
import SummerRepo from './summerRepo';

export type NotRegisteredArg = {
  message: string;
};

export default () => {
  validator.rule(
    'notSummerPaid',
    async (value, _compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const { errorReporter, arrayExpressionPointer, pointer } = options;

      const summerPaid = await new SummerRepo().alreadyPaidForCurrentYear(
        value
      );

      if (summerPaid) {
        errorReporter.report(
          pointer,
          'notSummerPaid',
          'student already paid summer fee for current year',
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
