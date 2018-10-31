
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes_collaborators').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes_collaborators').insert([

        //note 1 by ryan collaborators
        {note_id: 1, collaborator_id: 1}, // author ryan
        {note_id: 1, collaborator_id: 2}, // jessica
        {note_id: 1, collaborator_id: 4}, // carl
        {note_id: 1, collaborator_id: 5}, // timmy

        //note 2 by jessica collaborators
        {note_id: 2, collaborator_id: 2}, // author jessica
        {note_id: 2, collaborator_id: 1}, // ryan
        {note_id: 2, collaborator_id: 5}, // timmy

        //note 3 by sam collaborators
        {note_id: 3, collaborator_id: 3}, // author sam
        {note_id: 3, collaborator_id: 1}, // ryan
        {note_id: 3, collaborator_id: 4}, // carl

        //note 4 by carl collaborators
        {note_id: 4, collaborator_id: 4}, // author carl
        {note_id: 4, collaborator_id: 2}, // jessica

        //note 5 by timmy collaborators
        {note_id: 5, collaborator_id: 5}, //   author timmy
        {note_id: 5, collaborator_id: 1}, //   ryan
        {note_id: 5, collaborator_id: 2}, //   jessica
        {note_id: 5, collaborator_id: 3}, //   same
        {note_id: 5, collaborator_id: 4}, //   carl

        //note 6 by timmy collaborators
        {note_id: 6, collaborator_id: 5}, //   author timmy

      ]);
    });
};