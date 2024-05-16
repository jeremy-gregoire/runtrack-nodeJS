const fs = require('fs');
const url = require('url');

const dataPath = `${__dirname}/data.json`;

function handleRoute(request, response) {
  const id = parseInt(request.url.split('/')[2]);
  const URL = url.parse(request.url, true);

  if (request.method === 'GET' && request.url === '/tasks') {
    fs.readFile(dataPath, 'utf8', (_, data) => {
      const parsedData = JSON.parse(data);

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(parsedData.tasks));
    });
  } else if (request.method === 'GET' && request.url === `/tasks/${id}`) {
    fs.readFile(dataPath, (_, data) => {
      const parsedData = JSON.parse(data);
      const task = parsedData.tasks.filter((task) => task.id === id)[0] || {};

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(task));
    });
  } else if (
    request.method === 'POST' &&
    URL.pathname === '/tasks' &&
    URL.query.title &&
    URL.query.description
  ) {
    fs.readFile(dataPath, (_, data) => {
      const parsedData = JSON.parse(data);

      parsedData.tasks.push({
        id: parsedData.tasks[parsedData.tasks.length - 1].id + 1,
        title: URL.query.title,
        description: URL.query.description,
        completed: false,
      });

      fs.writeFile(dataPath, JSON.stringify(parsedData), (error) => {
        if (error) {
          throw error;
        } else {
          console.log('data.json updated!');
        }
      });

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(201);
      response.end({
        status: 'success',
      });
    });
  } else if (
    request.method === 'PUT' &&
    URL.pathname === `/tasks/${id}` &&
    URL.query.title &&
    URL.query.description
  ) {
    fs.readFile(dataPath, (_, data) => {
      const parsedData = JSON.parse(data);
      parsedData.tasks = parsedData.tasks.map((task) => {
        if (task.id === id) {
          task.title = URL.query.title;
          task.description = URL.query.description;
        }

        return task;
      });

      fs.writeFile(dataPath, JSON.stringify(parsedData), (error) => {
        if (error) {
          throw error;
        } else {
          console.log('data.json updated!');
        }
      });

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(201);
      response.end(
        JSON.stringify({
          status: 'success',
        })
      );
    });
  } else if (request.method === 'DELETE' && URL.pathname === `/tasks/${id}`) {
    // Experimental - To be test
    fs.readFile(dataPath, (_, data) => {
      const parsedData = JSON.parse(data);
      parsedData.tasks = parsedData.tasks.map((task) => {
        if (task.id === id) {
          return;
        }

        return task;
      });

      fs.writeFile(dataPath, JSON.stringify(parsedData), (error) => {
        if (error) {
          throw error;
        } else {
          console.log('data.json updated!');
        }
      });

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(201);
      response.end({
        status: 'success',
      });
    });
  } else {
    response.writeHead(404);
    response.end();
  }
}

module.exports = { handleRoute };
