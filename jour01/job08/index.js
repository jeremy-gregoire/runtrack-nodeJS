const fs = require('fs');

fs.readFile('jour01/job08/data.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    let output = '';

    for (let i = 0; i < data.length; i += 2) {
      output += data[i];
    }

    console.log(`Une lettre sur deux du fichier data.txt :\n${output}`);
  }
});
