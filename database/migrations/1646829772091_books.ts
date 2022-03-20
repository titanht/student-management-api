import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Books extends BaseSchema {
  protected tableName = 'books';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('title').notNullable();
      table.string('code').notNullable().unique();
      table.integer('quantity').notNullable();
      table.date('year').notNullable();
      table.text('description');
      table.string('author');
      table.string('genre');
      table.string('remark');
      table.decimal('price', 13);
      table.string('publisher');
      table.string('isbn');
      table.integer('loaned_count').defaultTo(0);
      table.text('img_path');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
