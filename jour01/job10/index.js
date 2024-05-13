const url = require('url');

let URL = new url.URL('https://www.google.com&search=nodejs');

console.log(`Ancienne URL : ${URL.href}`);

URL.host = 'www.laplateforme.io';
URL.searchParams.set('lang', 'fr');

console.log(`Nouvelle URL : ${URL.href}`);
