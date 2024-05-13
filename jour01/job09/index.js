const fs = require('fs');

fs.writeFile('jour01/job09/data.txt', 'Je manipule les fichiers avec un module node !', (error) => {
  if (error) {
    throw error;
  }

  console.log('Le fichier data.txt a été mise à jour !');
});
