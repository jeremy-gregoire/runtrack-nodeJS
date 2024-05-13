const fs = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
  switch (request.url) {
    case '/':
      fs.readFile('jour01/job14/index.html', 'utf8', (error, data) => {
        if (error) {
          response.writeHead(404);
          response.end(error);
        } else {
          response.setHeader('Content-Type', 'text/html');
          response.writeHead(200);
          response.end(data);
        }
      });
      break;
    case '/about':
      fs.readFile('jour01/job14/about.html', 'utf8', (error, data) => {
        if (error) {
          response.writeHead(404);
          response.end(error);
        } else {
          response.setHeader('Content-Type', 'text/html');
          response.writeHead(200);
          response.end(data);
        }
      });
      break;
    default:
      fs.readFile('jour01/job14/error.html', 'utf8', (error, data) => {
        if (error) {
          response.writeHead(404);
          response.end(error);
        } else {
          response.setHeader('Content-Type', 'text/html');
          response.writeHead(200);
          response.end(data);
        }
      });
      break;
  }
});

server.listen(8888);
