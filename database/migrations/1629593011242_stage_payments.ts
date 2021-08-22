import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { PaymentType } from 'app/modules/finance/payment/payment';

export default class StagePayments extends BaseSchema {
  protected tableName = 'stage_payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.text('data').notNullable();
      table.enum('type', Object.values(PaymentType)).notNullable();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
