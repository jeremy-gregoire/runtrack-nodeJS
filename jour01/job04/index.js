const fs = require('fs');

fs.readdir('./jour01', (error, files) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Contenu du répertoire courant :');
    files.forEach((file) => {
      console.log(file);
    });
  }
});
