const fs = require('fs');
const http = require('http');

const goToPage = (filepath, response) => {
  fs.readFile(filepath, 'utf8', (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end(error);
    } else {
      response.setHeader('Content-Type', 'text/html');
      response.writeHead(200);
      response.end(data);
    }
  });
};

const server = http.createServer((request, response) => {
  switch (request.url) {
    case '/':
      goToPage('jour01/job13/index.html', response);
      break;
    case '/about':
      goToPage('jour01/job13/about.html', response);
      break;
    default:
      response.writeHead(404);
      response.end();
      break;
  }
});

server.listen(8888);
