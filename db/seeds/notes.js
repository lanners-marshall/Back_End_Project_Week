
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'test title 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Dude'},
        {title: 'test title 2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Dude'},
        {title: 'test title 3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Gal'},
        {title: 'test title 4', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Gal'},
        {title: 'test title 5', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Dude'},
        {title: 'test title 4', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse iaculis, lectus accumsan malesuada cursus, odio sapien tempus lectus, id ornare velit nunc sed dui. Phasellus laoreet suscipit sollicitudin. Curabitur at diam elementum, scelerisque metus eget, lacinia tortor. Etiam in sapien eget erat rutrum imperdiet eget lobortis nisl.', author: 'Cool-Gal'},
      ]);
    });
};
