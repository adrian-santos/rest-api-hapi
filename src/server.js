'use strict';
const Hapi = require('hapi');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'birdbase'
  }
});

const server = Hapi.Server({
  host: 'localhost',
  port: 8080
});

// --------------
// Routes
// --------------

server.route({

  path: '/birds',
  method: 'GET',
  handler: (request, h) => {
    return (knex.select('*').from('birds'));
    // return(knex.select('*').from('employees').limit(10));
  }

});

server.route({
  path: '/{name}',
  method: 'GET',
  handler: (request, h) => {
    request.logger.info('In handler %s', request.path);

    return `Hello, ${encodeURIComponent(request.params.name)}!`;
  }
});

const init = async () => {

  await server.register({
    plugin: require('hapi-pino'),
    options:{
      prettyPrint: false,
      logEvents: ['response', 'onPostStart']
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();

