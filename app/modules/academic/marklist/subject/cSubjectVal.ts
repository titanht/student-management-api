import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CSubjectVal extends Validator {
  public schema = schema.create({
    subject: schema.string({}, [
      rules.unique({ table: 'subjects', column: 'subject' }),
    ]),
    code: schema.string({}, [
      rules.unique({
        table: 'subjects',
        column: 'code',
      }),
    ]),
    consider_for_rank: schema.boolean(),
  });
}
