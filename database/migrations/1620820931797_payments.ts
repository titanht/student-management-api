import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { PaymentType } from 'app/modules/finance/payment/payment';

export default class Payments extends BaseSchema {
  protected tableName = 'payments';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.decimal('fee', 15, 2).notNullable();
      table.integer('attachment').notNullable().index();
      table.integer('fs').notNullable().index();
      table.decimal('cash', 15, 2).defaultTo(0);
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table
        .enum('payment_type', Object.values(PaymentType))
        .notNullable()
        .index();

      table.boolean('hidden').defaultTo(false);
      table.date('slip_date');
      table.string('remark');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
