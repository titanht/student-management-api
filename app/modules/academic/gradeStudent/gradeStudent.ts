import {
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import AcademicYear from '../academicYear/academicYear';
import Grade from '../grade/grade';
import Conduct from '../student/conduct/conduct';
import NurserySkill from '../student/nurserySkill/nurserySkill';
import Skill from '../student/skill/skill';
import Student from '../student/student';

export default class GradeStudent extends Model {
  @column()
  public grade_id: string;

  @column()
  public student_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public active: boolean;

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

  @hasMany(() => Skill, {
    foreignKey: 'grade_student_id',
  })
  public skills: HasMany<typeof Skill>;

  @hasMany(() => NurserySkill, {
    foreignKey: 'grade_student_id',
  })
  public nurserySkills: HasMany<typeof NurserySkill>;

  @hasMany(() => Conduct, {
    foreignKey: 'grade_student_id',
  })
  public conducts: HasMany<typeof Conduct>;
}
