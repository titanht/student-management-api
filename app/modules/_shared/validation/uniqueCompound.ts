import { validator } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';
// import AcademicYear from 'app/modules/academic/academicYear/academicYear';

export type UniqueCompoundArg = {
  fields: string[];
  table: string;
  message: string;
  addActiveYear?: boolean;
};

export default () => {
  validator.rule(
    'uniqueCompound',
    async (
      value,
      [{ fields, table, message, addActiveYear = false }],
      { field, root, errorReporter, arrayExpressionPointer, pointer }
    ) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      /**
       * Parse phone number from a string
       */
      // console.log({ fields });
      const dbQuery = Database.from(table).where(field, root[field]);
      fields.forEach((fieldItem) => {
        dbQuery.where(fieldItem, root[fieldItem] || '');
      });
      if (addActiveYear) {
        // const yr = await AcademicYear.getActiveYear();
        // dbQuery.where('academic_year_id', yr.id);
      }
      const result = await dbQuery.first();
      // console.log(result);

      /**
       * Report error when phone number is not valid
       */
      if (result) {
        errorReporter.report(
          pointer,
          'uniqueCompound',
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
