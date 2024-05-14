const { handleRoute } = require('./routes');
const { server, startServer } = require('./server');

server.on('request', (request, response) => {
  handleRoute(request, response);
});

startServer();
