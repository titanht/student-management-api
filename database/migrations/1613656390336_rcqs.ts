import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rcqs extends BaseSchema {
  protected tableName = 'rcqs';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('quarter_id')
        .notNullable()
        .references('id')
        .inTable('quarters')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table
        .uuid('grade_student_id')
        .notNullable()
        .references('id')
        .inTable('grade_students')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table.float('total_score').notNullable();
      table.float('average').notNullable();
      table.integer('subject_count');
      table.integer('rank');
      table.boolean('finalized');
      table.date('finalize_date');

      table.unique(['grade_student_id', 'quarter_id'], 'report_quarter');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
