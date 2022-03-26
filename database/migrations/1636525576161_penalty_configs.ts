import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { PenaltyType } from 'app/modules/finance/payment/penaltyConfig/penaltyConfig';

export default class PenaltyConfigs extends BaseSchema {
  protected tableName = 'penalty_configs';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.integer('deadline_days').notNullable();

      table.integer('fixed_penalty_days').notNullable();
      table.decimal('fixed_penalty_fee', 15, 2).notNullable();

      table.decimal('incrementing_penalty_fee', 15, 2).notNullable();
      table.integer('incrementing_penalty_days').notNullable();

      table.enum('type', Object.values(PenaltyType)).notNullable();
      table.decimal('max_fee', 15, 2).defaultTo(0);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
