import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Semester from '../semester/semester';

export default class Quarter extends Model {
  @column()
  public quarter: number;

  @column()
  public semester_id: string;

  @belongsTo(() => Semester, {
    foreignKey: 'semester_id',
  })
  public semester: BelongsTo<typeof Semester>;
}
