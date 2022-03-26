import { validator } from '@ioc:Adonis/Core/Validator';
import RegistrationRepo from './registrationRepo';

export type NotRegisteredArg = {
  message: string;
};

export default () => {
  validator.rule(
    'notRegistered',
    async (value, compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const [{ message }] = compiledOptions as NotRegisteredArg[];
      const { errorReporter, arrayExpressionPointer, pointer } = options;

      const registered =
        await new RegistrationRepo().alreadyRegisteredForCurrentYear(value);

      if (registered) {
        errorReporter.report(
          pointer,
          'notRegistered',
          message,
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
