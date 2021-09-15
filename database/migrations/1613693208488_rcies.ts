import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rcies extends BaseSchema {
  protected tableName = 'rcies';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
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

      table.unique(['academic_year_id', 'grade_student_id'], 'report_year');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
