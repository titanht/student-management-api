import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class AttendanceSettings extends BaseSchema {
  protected tableName = 'attendance_settings';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.string('in_begin');
      table.string('in_end');
      table.string('late_in');
      table.string('out_begin');
      table.string('out_end');
      table.string('early_out');
      table.string('title');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
