const fs = require('fs');

fs.readFile('jour01/job06/data.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Contenu du fichier data.txt :\n${data}`);
  }
});
