
exports.up = (knex) => {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', (table) => {
      table.uuid('id').primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('users')
    .raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
