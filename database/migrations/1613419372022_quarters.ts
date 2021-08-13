import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Quarters extends BaseSchema {
  protected tableName = 'quarters';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.integer('quarter').unsigned().notNullable();
      table
        .uuid('semester_id')
        .notNullable()
        .references('id')
        .inTable('semesters')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
