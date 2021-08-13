import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Csts extends BaseSchema {
  protected tableName = 'csts';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('grade_id')
        .notNullable()
        .references('id')
        .inTable('grades')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('subject_id')
        .notNullable()
        .references('id')
        .inTable('subjects')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('teacher_id')
        .notNullable()
        .references('id')
        .inTable('teachers')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.integer('count').notNullable();

      table.unique([
        'subject_id',
        'teacher_id',
        'academic_year_id',
        'grade_id',
      ]);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
