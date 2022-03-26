import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RcqCsts extends BaseSchema {
  protected tableName = 'rcq_csts';

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
        .uuid('rcq_id')
        .notNullable()
        .references('id')
        .inTable('rcqs')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.float('score').defaultTo(0);

      table.unique(['cst_id', 'rcq_id'], 'report_cst_uniq');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
