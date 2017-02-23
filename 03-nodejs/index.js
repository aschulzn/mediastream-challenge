'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO
app.get('/users', function(req, res) {
  var fs = require('fs');
  User.find(function(err, users) {
    if(err) {
      return res.send(err);
    }
    var csvText = '';
    users.forEach(function(user) {
      csvText = csvText + user.name + ',' + user.email + '\n';
    });
    fs.writeFile('users.csv', csvText, 'utf8', function (err) {
      if(err) {
        return res.send('Ha ocurrido un error');
      }
      return res.download('users.csv', 'Users.csv');
    });
    //
  });
});

app.listen(3000);
