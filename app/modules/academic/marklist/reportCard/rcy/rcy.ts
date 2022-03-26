import {
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
import RcyCst from '../rcyCst/rcyCst';

export default class Rcy extends Model {
  @column()
  public academic_year_id: string;

  @column()
  public grade_student_id: string;

  @column()
  public total_score: number;

  @column()
  public average: number;

  @column()
  public subject_count: number;

  @column()
  public rank: number | null;

  @column()
  public finalized: boolean;

  @column.date()
  public finalize_date?: DateTime | null;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;

  @belongsTo(() => GradeStudent, {
    foreignKey: 'grade_student_id',
  })
  public gradeStudent: BelongsTo<typeof GradeStudent>;

  @hasMany(() => RcyCst, {
    foreignKey: 'rcy_id',
  })
  public rcyCsts: HasMany<typeof RcyCst>;
}
