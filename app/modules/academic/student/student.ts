import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { Gender } from 'app/modules/_shared/types';
import GradeStudent from '../gradeStudent/gradeStudent';

export default class Student extends Model {
  @column()
  public first_name: string;

  @column()
  public father_name: string;

  @column()
  public gender: Gender;

  @column()
  public grand_father_name: string;

  @column()
  public id_number: string;

  @column()
  public primary_phone: string;

  @column()
  public img: string;

  @column()
  public age?: number;

  @column()
  public scholarship_amount: number;

  @hasMany(() => GradeStudent, {
    foreignKey: 'student_id',
  })
  public gradeStudents: HasMany<typeof GradeStudent>;
}
