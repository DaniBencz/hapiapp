'use strict';

import Hapi from '@hapi/hapi';
import { plugin1, plugin2 } from './packages/plugins.js';

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World!';
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

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

export default server;
