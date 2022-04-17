import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export default class CCstVal extends Validator {
  public schema = schema.create({
    grade_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'grades',
      }),
    ]),
    subject_id: schema.string({}, [
      // TODO: Add already assigned for grade validation
      rules.exists({
        column: 'id',
        table: 'subjects',
      }),
      rules.unique({
        table: 'csts',
        column: 'subject_id',
        where: {
          academic_year_id: this.ctx.request.body().academic_year_id,
          grade_id: this.ctx.request.body().grade_id,
        },
      }),
    ]),
    teacher_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'teachers',
      }),
    ]),
    academic_year_id: schema.string({}, [
      rules.exists({
        column: 'id',
        table: 'academic_years',
      }),
      rules.uniqueCompound({
        table: 'csts',
        fields: ['grade_id', 'subject_id', 'teacher_id'],
        message: 'Class subject teacher already assigned for academic year',
      }),
      // rules.unique({
      //   table: 'csts',
      //   column: 'academic_year_id',
      //   where: {
      //     grade_id: this.body.grade_id,
      //     subject_id: this.body.subject_id,
      //     teacher_id: this.body.teacher_id,
      //   },
      // }),
    ]),
    count: schema.number(),
  });

  public messages = {
    ...this.messages,
    'subject_id.unique': 'Subject already assigned to class',
  };
}
