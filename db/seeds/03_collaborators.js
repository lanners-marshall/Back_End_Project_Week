
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('collaborators').del()
    .then(function () {
      // Inserts seed entries
      return knex('collaborators').insert([
        {name: 'ryan'},
        {name: 'jessica'},
        {name: 'sam'},
        {name: 'carl'},
        {name: 'timmy'},
      ]);
    });
};