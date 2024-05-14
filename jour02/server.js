const http = require('http');

const hostname = 'localhost';
const port = 2024;
const baseURL = `http://${hostname}:${port}`;

const server = http.createServer();

function startServer() {
  server.listen(port, hostname, () => {
    console.log(`Server is running on ${baseURL}`);
  });
}

module.exports = { baseURL, server, startServer };
