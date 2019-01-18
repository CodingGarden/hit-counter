
exports.up = function(knex) {
  return knex.schema.createTable('ban', function (table) {
    table.increments();
    table
      .integer('counterId')
      .unsigned()
      .notNullable();
    table
      .foreign('counterId')
      .references('id')
      .inTable('counter')
      .onDelete('CASCADE');
    table.string('ip').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ban');
};
