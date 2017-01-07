
exports.up = function(knex, Promise) {
    return knex.schema.createTable('post', function (table) {
        table.increments('id');
        table.text('text').notNullable();
        table.integer('topic_id').notNullable().references('id').inTable('topic').onDelete('cascade');
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('cascade');
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('post');
};
