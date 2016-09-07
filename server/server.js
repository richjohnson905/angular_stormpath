'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var stormpath = require('express-stormpath');

var router = express.Router();

var pg = require('pg');
var db;

//var connectionString = 'postgres://ec2-54-243-47-213.compute-1.amazonaws.com:5432/dbboidjdr156ff';
if (true) {
	console.log("setting up local db");
	var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
	var db = new pg.Client(connectionString);
	db.connect();
}
else {
	console.log("setting up ssl aws db");
	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, theClient) {
	  if (err) throw err;
	  console.log('Connected to postgres! Getting schemas...');
	  db = theClient;
	});
}

/**
 * Create the Express application.
 */
var app = express();

app.all('*', function(request, response, next) {
    request.database = db;
    next();
});

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
app.use(stormpath.init(app, {
	postRegistrationHandler: function (account, req, res, next) {
	    console.log('User:', account.email, 'just registered!');
		db.query("INSERT INTO stormpath(email) values($1)", [account.email]);
	    next();
	},
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
app.use('/provider', bodyParser.json(), stormpath.loginRequired, require('./routes/providerRoutes'));
app.use('/todos', bodyParser.json(), stormpath.loginRequired, require('./routes/todos'));
app.use('/dashboard', bodyParser.json(), stormpath.loginRequired, require('./routes/dashboard'));

app.route('/*')
  .get(function(req, res) {
	  console.log("Got a GET request from my angular app");
      res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  });

app.post('/profile', bodyParser.json(), stormpath.loginRequired, require('./routes/profile'));

/**
 * Start the web server.
 */
app.on('stormpath.ready',function () {
  console.log('Stormpath Ready');
});


var port = process.env.PORT || 3300;
app.listen(port, function () {
  console.log('Application running at http://localhost:'+port);
});