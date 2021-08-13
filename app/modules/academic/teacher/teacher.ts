import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';

export default class Teacher extends Model {
  @column()
  public user_id: string;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;
}
