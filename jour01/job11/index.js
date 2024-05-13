const http = require('http');
const server = http.createServer();

server.on('request', (_, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    JSON.stringify({
      data: 'Hello World!',
    })
  );
});

server.listen(8888);
