import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RcyCsts extends BaseSchema {
  protected tableName = 'rcy_csts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('cst_id')
        .notNullable()
        .references('id')
        .inTable('csts')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('rcy_id')
        .notNullable()
        .references('id')
        .inTable('rcies')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.float('score').defaultTo(0);

      table.unique(['cst_id', 'rcy_id'], 'rcy_cst_unique');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
