import { column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import Grade from 'app/modules/academic/grade/grade';

export default class Hrt extends Model {
  @column()
  public grade_id: string;

  @column()
  public user_id: string;

  @belongsTo(() => Grade, {
    foreignKey: 'grade_id',
  })
  public grade: BelongsTo<typeof Grade>;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;
}
