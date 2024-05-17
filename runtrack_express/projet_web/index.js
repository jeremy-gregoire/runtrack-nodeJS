const express = require('express');
const app = express();

const PORT = 3000; // 80 doesn't work for me

// Set a view engine
app.set('view engine', 'ejs');

// Set the public folder
app.use(express.static(__dirname + '/public'));

app.get('/', (_, response) => {
  response.render('index');
});

app.get('/about', (_, response) => {
  response.render('about');
});

app.use((_, response, next) => {
  response.status(404);
  response.render('404');
});

app.listen(PORT, () => {
  console.log(`Application listing on port ${PORT}`);
});
