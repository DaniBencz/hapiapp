'use strict';

exports.myPlugin = {
  pkg: require('./package.json'),
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
