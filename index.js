'use strict';

import Hapi from '@hapi/hapi';
import { plugin1, plugin2 } from './packages/plugins.js';
import Scooter from '@hapi/scooter'; // user-agent info
import hapi_jwt from 'hapi-auth-jwt2';
import people from './db.js';

// __dirname is not available with module mode
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const validate = async function (decoded, request, h) {
  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return { isValid: false };
  }
  else {
    return { isValid: true };
  }
};


const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

await server.register(Scooter);
await server.register(hapi_jwt);

server.auth.strategy('jwt', 'jwt',
  {
    key: 'NeverShareYourSecret', // Never Share your secret key
    validate  // validate function defined above
  }
);

await server.register([
  plugin1,
  {
    plugin: plugin2,
    options: {
      isTest: 'Yessir'
    }
  }
]);

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return request.plugins.scooter.toJSON();
  }
});

const init = async () => {
  await server.start();
  console.log('Server running on %s', server.info.uri);
  console.log(`__dirname is ${__dirname}`);
};
init();

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

export default server;
