import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { AttendanceTypes } from 'app/modules/academic/homeRoom/studentAttendance/student-attendance';

export default class StudentAttendances extends BaseSchema {
  protected tableName = 'student_attendances';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .uuid('student_id')
        .notNullable()
        .references('id')
        .inTable('students')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('academic_year_id')
        .notNullable()
        .references('id')
        .inTable('academic_years')
        .onUpdate('cascade')
        .onDelete('cascade')
        .index();
      table.enum('status', Object.values(AttendanceTypes)).notNullable();
      table.date('date').notNullable();
      table.string('late_reason');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
