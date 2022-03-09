import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Books extends BaseSchema {
  protected tableName = 'books';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('title').notNullable();
      table.string('code').notNullable().unique();
      table.text('description').notNullable();
      table.string('author').notNullable();
      table.string('genre').notNullable();
      table.date('year').notNullable();
      table.integer('quantity').notNullable();
      table.integer('loaned_count').defaultTo(0);
      table.string('remark');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
