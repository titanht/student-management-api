import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class EvaluationMethods extends BaseSchema {
  protected tableName = 'evaluation_methods';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('evaluation_type_id')
        .notNullable()
        .references('id')
        .inTable('evaluation_types')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('quarter_id')
        .notNullable()
        .references('id')
        .inTable('quarters')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('cst_id')
        .notNullable()
        .references('id')
        .inTable('csts')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.index(['evaluation_type_id', 'quarter_id', 'cst_id'], 'eval_index');
      table.unique(
        ['evaluation_type_id', 'quarter_id', 'cst_id'],
        'eval_meth_cst'
      );

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
