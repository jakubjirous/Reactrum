
exports.up = function(knex, Promise) {
    return knex.schema.createTable('topic', function (table) {
        table.increments('id');
        table.string('title').notNullable().unique();
        table.integer('posts_count').notNullable().defaultTo(0);
        table.integer('board_id').notNullable().references('id').inTable('board').onDelete('cascade');
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('topic');
};
