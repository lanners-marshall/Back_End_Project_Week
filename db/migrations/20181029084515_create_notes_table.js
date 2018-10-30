exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
  	tbl.increments();

  	tbl
  		.string('title')
  		.notNullable()

  	tbl
  		.string('text')
  		.notNullable()

    tbl
      .string('author')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes')
};