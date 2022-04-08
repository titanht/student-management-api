import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import Teacher from '../academic/teacher/teacher';
import Model from '../_shared/model';

export default class User extends Model {
  @column()
  public first_name: string;

  @column()
  public father_name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public permissions?: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasOne(() => Teacher, {
    foreignKey: 'user_id',
  })
  public teacher: HasOne<typeof Teacher>;
}
