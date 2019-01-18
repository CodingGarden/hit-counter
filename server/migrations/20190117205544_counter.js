
exports.up = function(knex) {
  return knex.schema.createTable('counter', function (table) {
    table.increments();
    table.string('guid').notNullable();
    table.index('guid');
    table.string('secretKey').notNullable();
    table.string('fontFamily', 50).notNullable();
    table.string('fontColor', 9).notNullable();
    table.integer('fontSize').notNullable();
    table.string('backgroundColor', 9).notNullable();
    table.integer('width').notNullable();
    table.integer('height').notNullable();
    table.integer('maxLength').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('counter');
};
