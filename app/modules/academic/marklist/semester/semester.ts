import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Quarter from '../quarter/quarter';

export default class Semester extends Model {
  @column()
  public semester: number;

  @hasMany(() => Quarter, {
    foreignKey: 'semester_id',
  })
  public quarters: HasMany<typeof Quarter>;
}
