import server from './index.js';

// Start application before running the test case
beforeAll((done) => {
  server.events.on('start', () => {
    done();
  });
});

// Stop application after running the test case
afterAll((done) => {
  server.events.on('stop', () => {
    done();
  });
  server.stop();
});

test('should succeed with server connection', async function () {
  const options = {
    method: 'GET',
    url: '/'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
});
