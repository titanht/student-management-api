import {
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import AcademicYear from '../../academicYear/academicYear';
import Grade from '../../grade/grade';
import Teacher from '../../teacher/teacher';
import EvaluationMethod from '../evaluationMethod/evaluationMethod';
import RcqCst from '../reportCard/rcqCst/rcqCst';
import RcsCst from '../reportCard/rcsCst/rcsCst';
import RcyCst from '../reportCard/rcyCst/rcyCst';
import Subject from '../subject/subject';

export default class Cst extends Model {
  @column()
  public grade_id: string;

  @column()
  public subject_id: string;

  @column()
  public teacher_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public count: number;

  @belongsTo(() => Grade, {
    foreignKey: 'grade_id',
  })
  public grade: BelongsTo<typeof Grade>;

  @belongsTo(() => Subject, {
    foreignKey: 'subject_id',
  })
  public subject: BelongsTo<typeof Subject>;

  @belongsTo(() => Teacher, {
    foreignKey: 'teacher_id',
  })
  public teacher: BelongsTo<typeof Teacher>;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;

  @hasMany(() => EvaluationMethod, {
    foreignKey: 'cst_id',
  })
  public evaluationMethods: HasMany<typeof EvaluationMethod>;

  @hasMany(() => RcqCst, {
    foreignKey: 'cst_id',
  })
  public rcqCsts: HasMany<typeof RcqCst>;

  @hasMany(() => RcsCst, {
    foreignKey: 'cst_id',
  })
  public rcsCsts: HasMany<typeof RcsCst>;

  @hasMany(() => RcyCst, {
    foreignKey: 'cst_id',
  })
  public rcyCsts: HasMany<typeof RcyCst>;
}
