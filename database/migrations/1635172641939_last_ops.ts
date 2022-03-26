import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class LastOps extends BaseSchema {
  protected tableName = 'last_ops';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary();

      table.datetime('last_log');

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
