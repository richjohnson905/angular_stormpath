'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var stormpath = require('express-stormpath');

var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
/**
 * Create the Express application.
 */
var app = express();

/**
 * The 'trust proxy' setting is required if you will be deploying your
 * application to Heroku, or any other environment where you will be behind an
 * HTTPS proxy.
 */
app.set('trust proxy',true);

/*
  We need to setup a static file server that can serve the assets for the
  angular application.  We don't need to authenticate those requests, so we
  setup this server before we initialize Stormpath.

 */

app.use('/',express.static(path.join(__dirname, '..', 'client'),{ redirect: false }));

/**
 * Now we initialize Stormpath, any middleware that is registered after this
 * point will be protected by Stormpath.
 */

console.log('Initializing Stormpath');

app.use(stormpath.init(app, {
  web: {
    spa: {
      enabled: true,
      view: path.join(__dirname, '..', 'client','index.html')
    },
    me: {
      expand: {
        customData: true,
        groups: true
      }
    },
    debug: 'info'
  }
}));

/**
 * Now that our static file server and Stormpath are configured, we let Express
 * know that any other route that hasn't been defined should load the Angular
 * application.  It then becomes the responsiliby of the Angular application
 * to define all view routes, and rediret to the home page if the URL is not
 * defined.
 */
// app.route('/*')
//   .get(function(req, res) {
//     res.sendFile(path.join(__dirname, '..', 'client','index.html'));
//   });

// app.post('/profile', bodyParser.json(), stormpath.loginRequired, require('./routes/profile'));

/**
 * Start the web server.
 */
// app.on('stormpath.ready',function () {
//   console.log('Stormpath Ready');
// });


app.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Application running at http://localhost:'+port);
});