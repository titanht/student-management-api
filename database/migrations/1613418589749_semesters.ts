import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Semesters extends BaseSchema {
  protected tableName = 'semesters';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.integer('semester').unsigned().notNullable().unique().index();

      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
