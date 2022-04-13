'use strict';

import Hapi from '@hapi/hapi';
import { plugin1, plugin2 } from './packages/plugins.js';
import Scooter from '@hapi/scooter';

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

await server.register(Scooter);

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return request.plugins.scooter.toJSON();
  }
});

await server.register([
  plugin1,
  {
    plugin: plugin2,
    options: {
      isTest: 'Yessir'
    }
  }
]);

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
};
init();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

export default server;
