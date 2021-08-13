import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Registrations extends BaseSchema {
  protected tableName = 'registrations';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('payment_id')
        .notNullable()
        .references('id')
        .inTable('payments');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
