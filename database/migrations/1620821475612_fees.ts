import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { Months } from 'app/modules/finance/payment/payment';

export default class Fees extends BaseSchema {
  protected tableName = 'fees';

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
      table.decimal('penalty', 15, 2).defaultTo(0);
      table.decimal('scholarship', 15, 2).defaultTo(0);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
