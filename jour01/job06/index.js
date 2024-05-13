const fs = require('fs');

const data = fs.readFileSync('jour01/job06/data.txt', 'utf8');
console.log(`Contenu du fichier data.txt :\n${data}`);
