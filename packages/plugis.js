'use strict';

exports.plugin1 = {
  name: "plugin1",
  version: "1.0.0",
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/{name}',
      handler: (request, h) => {

        return `Hello ${request.params.name}`;
      }
    });

  }
};

exports.plugin2 = {
  pkg: require('./package.json'),
  register: async function (server, options) {

    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, h) => {

        return options.isTest;
      }
    });

  }
};
