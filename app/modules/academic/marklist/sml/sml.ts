import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
import GradeStudent from '../../gradeStudent/gradeStudent';
import EvaluationMethod from '../evaluationMethod/evaluationMethod';

export default class Sml extends Model {
  @column()
  public evaluation_method_id: string;

  @column()
  public grade_student_id: string;

  @column()
  public score: number;

  @column()
  public finalized: boolean;

  @column.date()
  public finalize_date?: DateTime;

  @belongsTo(() => EvaluationMethod, {
    foreignKey: 'evaluation_method_id',
  })
  public evaluationMethod: BelongsTo<typeof EvaluationMethod>;

  @belongsTo(() => GradeStudent, {
    foreignKey: 'grade_student_id',
  })
  public gradeStudent: BelongsTo<typeof GradeStudent>;
}
