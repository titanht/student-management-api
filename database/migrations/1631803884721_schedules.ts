import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Schedules extends BaseSchema {
  protected tableName = 'schedules';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table
        .integer('academic_year_id')
        .unsigned()
        .references('id')
        .inTable('academic_years')
        .unique();
      table.text('schedule', 'longtext');
      table.boolean('finalized').defaultTo(false);

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
