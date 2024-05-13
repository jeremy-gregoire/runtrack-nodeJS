const fs = require('fs');
const http = require('http');

const server = http.createServer((_, response) => {
  fs.readFile('jour01/job12/index.html', 'utf8', (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end(error);
    } else {
      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(data);
    }
  });
});

server.listen(8888);
