
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
      table.increments('id');
      table.string('username').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password_digest').notNullable();    // encrypted version of password
      table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
