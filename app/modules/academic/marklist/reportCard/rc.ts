import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
// import Cst from '../cst/cst';

export default class Rc extends Model {
  @column()
  public grade_student_id: string;

  @column()
  public total_score: number;

  @column()
  public average: number;

  @column()
  public subject_count: number;

  @column()
  public rank: number | null;

  @column()
  public finalized: boolean | null;

  @column.date()
  public finalize_date: DateTime | null;
}

// export type ReportCts = Cst & {
//   evaluation_methods:
// }
