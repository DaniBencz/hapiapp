'use strict';

const myPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/test',
      handler: function (request, h) {

        return 'test';
      }
    });

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: (request, h) => {

        return `Hello ${request.params.name}`;
      }
    });

  }
};

export default myPlugin;
