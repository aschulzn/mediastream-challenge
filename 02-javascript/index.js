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

console.log(`- What it does?
Hace llamadas a endpoints utilizando distintos métodos http.
El único parametro requerido es method. Una vez ejecutada la función, devuelve otra función que realizada la llamada al endpoint.
Esta función concatena los elementos de un arreglo llamado path con el  parámetro 'base' de la función anterior para armar la URL absoluta.
`)

console.log(`- How it is called this design pattern or technique?
Se usa ES6 y la técnica es programación funcional.`)

requester('GET', 'https://api.github.com/users/mediastream')().then(function(data){
  console.log('Caso 1, llamada directa al endpoint');
  console.log(`requester('GET', 'https://api.github.com/users/mediastream')()`);
});

requester('GET', 'https://api.github.com')(['users', 'mediastream']).then(function(data) {
  console.log('Caso 2: Llamada al endpoint a través de la concatenación de la base con el path');
  console.log(`requester('GET', 'https://api.github.com')(['users', 'mediastream'])`);
});

requester('GET')(['https://api.github.com', 'users', 'mediastream']).then(function(data){
  console.log('Case 3: Llamada al endpoint a través de la concatenación de todos los parametros del path');
  console.log(`requester('GET', 'https://api.github.com')(['users', 'mediastream'])`);
})
