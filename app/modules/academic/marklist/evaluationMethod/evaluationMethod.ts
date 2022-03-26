import {
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';
import Cst from 'app/modules/academic/marklist/cst/cst';
import EvaluationType from '../evaluationType/evaluationType';
import Quarter from '../quarter/quarter';
import Sml from '../sml/sml';

export default class EvaluationMethod extends Model {
  @column()
  public evaluation_type_id: string;

  @column()
  public quarter_id: string;

  @column()
  public cst_id: string;

  @belongsTo(() => EvaluationType, {
    foreignKey: 'evaluation_type_id',
  })
  public evaluationType: BelongsTo<typeof EvaluationType>;

  @belongsTo(() => Quarter, {
    foreignKey: 'quarter_id',
  })
  public quarter: BelongsTo<typeof Quarter>;

  @belongsTo(() => Cst, {
    foreignKey: 'cst_id',
  })
  public cst: BelongsTo<typeof Cst>;

  @hasMany(() => Sml, {
    foreignKey: 'evaluation_method_id',
  })
  public smls: HasMany<typeof Sml>;
}
