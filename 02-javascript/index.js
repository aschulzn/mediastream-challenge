'use strict';

console.log(`
2.
---

Take a look at the 'requester' function.

- What it does?
Hace llamadas a endpoints utilizando distintos métodos http.
- How it's used? Add different use-case examples that covers every functionality.
- How it is called this design pattern or technique?
Se usa ES6 y la técnica es programación funcional.

HINT: Use https://api.github.com/users/mediastream
`);

// Add fetch polyfill for Node.js
require('isomorphic-fetch'); // See: https://github.com/matthew-andrews/isomorphic-fetch

function requester(method, base, headers = { Accept: '*/*' }) {
  return (path = []) => fetch((base ? [base, ...path] : path).join('/'), { method, headers })
    .then(r => r.json());
}

console.log('')
requester('GET', 'https://api.github.com/users/mediastream')().then(function(data){
  console.log('Caso 1, llamada directa al endpoint');
});

requester('GET', 'https://api.github.com')(['users', 'mediastream']).then(function(data) {
  console.log('Caso 2: Llamada al endpoint a través de la concatenación de la base con el path');
});

requester('GET')(['https://api.github.com', 'users', 'mediastream']).then(function(data){
  console.log('Case 3: Llamada al endpoint a través de la concatenación de todos los parametros del path');
})
