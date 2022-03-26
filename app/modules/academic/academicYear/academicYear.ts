import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export default class AcademicYear extends Model {
  public static async getActiveYear() {
    return (
      await AcademicYear.query().where('active', true).firstOrFail()
    ).serialize();
  }

  @column()
  public year: number;

  @column()
  public active: boolean;
}
