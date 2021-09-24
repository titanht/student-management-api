import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AttendanceMappings extends BaseSchema {
  protected tableName = 'attendance_mappings';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('account_id').notNullable().unique();
      table
        .uuid('attendance_setting_id')
        .notNullable()
        .references('id')
        .inTable('attendance_settings')
        .onUpdate('cascade')
        .onDelete('cascade');
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .unique()
        .onUpdate('cascade')
        .onDelete('cascade');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
