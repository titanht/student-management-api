import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';
import { timeValidationRule } from 'app/services/utils/stringUtils';

export default class CAttendanceSettingVal extends Validator {
  public schema = schema.create({
    in_begin: schema.string({}, [rules.regex(timeValidationRule)]),
    in_end: schema.string({}, [rules.regex(timeValidationRule)]),
    late_in: schema.string({}, [rules.regex(timeValidationRule)]),
    out_begin: schema.string({}, [rules.regex(timeValidationRule)]),
    out_end: schema.string({}, [rules.regex(timeValidationRule)]),
    early_out: schema.string({}, [rules.regex(timeValidationRule)]),
    title: schema.string({}),
  });

  public messages = {
    ...super.messages,
    regex: 'time format invalid use (hh:mm am|pm)',
  };
}
