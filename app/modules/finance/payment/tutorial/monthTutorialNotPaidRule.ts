import { validator } from '@ioc:Adonis/Core/Validator';
import TutorialRepo from './tutorialRepo';

export default () => {
  validator.rule(
    'monthTutorialNotPaid',
    async (value, _compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const { errorReporter, arrayExpressionPointer, pointer, root } = options;

      const paid = await new TutorialRepo().monthPaid(
        root.student_id || '',
        root.month || ''
      );

      if (paid) {
        errorReporter.report(
          pointer,
          'monthTutorialNotPaid',
          'tutorial fee already paid for this month',
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
