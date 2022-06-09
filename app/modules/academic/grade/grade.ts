import {
  column,
  HasMany,
  hasMany,
  hasOne,
  manyToMany,
  HasOne,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import GradeStudent from '../gradeStudent/gradeStudent';
import Hrt from '../homeRoom/hrt/hrt';
import Cst from '../marklist/cst/cst';
import Student from '../student/student';

export default class Grade extends Model {
  @column()
  public name: string;

  @column()
  public order: number;

  @column()
  public monthly_fee: number;

  @column()
  public registration_fee: number;

  @column()
  public tutorial_fee: number;

  @column()
  public summer_fee: number;

  @column()
  public report_card_template: string;

  @column()
  public skill_template: string;

  @hasMany(() => Cst, {
    foreignKey: 'grade_id',
  })
  public csts: HasMany<typeof Cst>;

  @hasOne(() => Hrt, {
    foreignKey: 'grade_id',
  })
  public hrt: HasOne<typeof Hrt>;

  @hasMany(() => GradeStudent, {
    foreignKey: 'grade_id',
  })
  public gradeStudents: HasMany<typeof GradeStudent>;

  @manyToMany(() => Student, {
    pivotTable: 'grade_students',
    // pivotForeignKey: 'grade_id',
    // pivotRelatedForeignKey: 'student_id',
    // pivotColumns: ['academic_year_id', 'id'],
  })
  public students: ManyToMany<typeof Student>;
}
