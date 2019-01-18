
exports.up = function(knex) {
  return knex.schema.table('visitor', function (table) {
    table.string('ip').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('visitor', function (table) {
    table.dropColumn('ip');
  });
};
