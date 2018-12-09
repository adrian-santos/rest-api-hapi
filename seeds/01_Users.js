exports.seed = function(knex, Promise) {
  var tableName = 'users';

  var rows = [
    {
      name: 'Adrian Santos',
      username: 'adrian-santos',
      password: 'password',
      email: 'adrian@proconoptions.com',
      guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c'
    }
  ];

  return (
    knex(tableName)
      //Empty table
      .del()
      .then(() => {
        return knex.insert(rows).into(tableName);
      })
  );
};
