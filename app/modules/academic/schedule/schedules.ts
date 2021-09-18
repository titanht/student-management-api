import { column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import AcademicYear from '../academicYear/academicYear';

export default class Schedule extends Model {
  @column()
  public schedule: string;

  @column()
  public academic_year_id: string;

  @column()
  public finalized: boolean;

  @hasOne(() => AcademicYear)
  public academicYear: HasOne<typeof AcademicYear>;
}
