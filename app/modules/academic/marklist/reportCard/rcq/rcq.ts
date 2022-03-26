import {
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Quarter from '../../quarter/quarter';
import Rc from '../rc';
import RcqCst from '../rcqCst/rcqCst';

export default class Rcq extends Rc {
  @column()
  public quarter_id: string;

  @belongsTo(() => GradeStudent, {
    foreignKey: 'grade_student_id',
  })
  public gradeStudent: BelongsTo<typeof GradeStudent>;

  @belongsTo(() => Quarter, {
    foreignKey: 'quarter_id',
  })
  public quarter: BelongsTo<typeof Quarter>;

  @hasMany(() => RcqCst, {
    foreignKey: 'rcq_id',
  })
  public rcqCsts: HasMany<typeof RcqCst>;
}
