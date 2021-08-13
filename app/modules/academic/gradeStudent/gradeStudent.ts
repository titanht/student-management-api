import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import AcademicYear from '../academicYear/academicYear';
import Grade from '../grade/grade';
import Student from '../student/student';

export default class GradeStudent extends Model {
  @column()
  public grade_id: string;

  @column()
  public student_id: string;

  @column()
  public academic_year_id: string;

  @belongsTo(() => Grade, {
    foreignKey: 'grade_id',
  })
  public grade: BelongsTo<typeof Grade>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;
}
