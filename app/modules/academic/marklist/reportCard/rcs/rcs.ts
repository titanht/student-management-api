import {
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import GradeStudent from '../../../gradeStudent/gradeStudent';
import Semester from '../../semester/semester';
import Rc from '../rc';
import RcsCst from '../rcsCst/rcsCst';

export default class Rcs extends Rc {
  @column()
  public semester_id: string;

  @belongsTo(() => Semester, {
    foreignKey: 'semester_id',
  })
  public semester: BelongsTo<typeof Semester>;

  @belongsTo(() => GradeStudent, {
    foreignKey: 'grade_student_id',
  })
  public gradeStudent: BelongsTo<typeof GradeStudent>;

  @hasMany(() => RcsCst, {
    foreignKey: 'rcs_id',
  })
  public rcsCsts: HasMany<typeof RcsCst>;
}
