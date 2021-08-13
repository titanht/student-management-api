import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RcsCsts extends BaseSchema {
  protected tableName = 'rcs_csts';

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
        .uuid('rcs_id')
        .notNullable()
        .references('id')
        .inTable('rcs')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.float('score').defaultTo(0);

      table.unique(['cst_id', 'rcs_id'], 'report_cst_sem_uniq');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
