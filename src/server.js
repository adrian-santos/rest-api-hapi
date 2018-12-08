const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    username: 'root',
    password: 'adriansantos',
    database: 'employees'
  }
});

knex('employees').where('*');
