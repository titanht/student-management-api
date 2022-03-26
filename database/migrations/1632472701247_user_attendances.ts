import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserAttendances extends BaseSchema {
  protected tableName = 'user_attendances';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.date('date').notNullable();
      table.integer('day_week');
      table.integer('week_year');
      table.integer('month');
      table.text('time_in');
      table.text('time_out');
      table.boolean('present_in');
      table.boolean('present_out');
      table.boolean('late_in');
      table.boolean('early_out');
      table.boolean('only_in');
      table.boolean('only_out');
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade');

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
