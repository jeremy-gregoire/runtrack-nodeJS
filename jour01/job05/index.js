const path = require('path');

const filePath = '/jour01/job05/index.js';
const filename = path.basename(filePath);
const extname = path.extname(filePath);
const dirname = path.dirname(filePath);

console.log(`Nom du fichier : ${filename}`);
console.log(`Extension du fichier : ${extname}`);
console.log(`Répertoire parent du fichier : ${dirname}`);
