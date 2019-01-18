
exports.up = function(knex) {
  return knex.schema.createTable('visitor', function (table) {
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
    table
      .integer('visitCount')
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table
      .datetime('lastVisited')
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('visitor');
};
