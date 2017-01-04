
exports.up = function(knex, Promise) {
    return knex.schema.createTable('board', function (table) {
        table.increments('id');
        table.string('title').notNullable().unique();
        table.integer('category_id').notNullable().references('id').inTable('category').onDelete('cascade');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('board');
};
