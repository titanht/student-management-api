import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { Months } from 'app/modules/finance/payment/payment';

export default class Tutorials extends BaseSchema {
  protected tableName = 'tutorials';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.enum('month', Object.values(Months)).notNullable().index();
      table
        .uuid('payment_id')
        .notNullable()
        .references('id')
        .inTable('payments')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
