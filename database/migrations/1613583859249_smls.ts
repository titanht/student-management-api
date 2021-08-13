import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Smls extends BaseSchema {
  protected tableName = 'smls';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('evaluation_method_id')
        .notNullable()
        .references('id')
        .inTable('evaluation_methods')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('grade_student_id')
        .notNullable()
        .references('id')
        .inTable('grade_students')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.float('score').notNullable();
      table.boolean('finalized').notNullable();
      table.date('finalize_date');

      table.unique(['evaluation_method_id', 'grade_student_id'], 'eval_uni');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
