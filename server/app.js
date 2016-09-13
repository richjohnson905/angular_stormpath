/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var ExpressStormpath = require('express-stormpath');
var path = require('path');
var config = require('./config/environment');
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


// Setup server
var app = express();



app.all('*', function(request, response, next) {
    request.database = db;
    next();
});

app.use(ExpressStormpath.init(app,{
	postRegistrationHandler: function (account, req, res, next) {
		    console.log('User:', account.email, 'just registered!');
			db.query("INSERT INTO stormpath(email) values($1)", [account.email]);
		    next();
		},
	web: {
		spa: {
		  enabled: true,
		  view: path.join(__dirname, '..','client','index.html')
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

// Described in the Stormpath SDK
app.get('/home', ExpressStormpath.getUser, function (req, res) {
  var stormpathApplication = req.app.get('stormpathApplication');
  // Do stuff with stormpath
});

/* REMOVE THIS
app.get('/secret', function (req, res) {
  var client = req.app.get('stormpathClient');

  // For example purposes only -- you probably don't want to actually expose
  // this information to your users =)
  client.getCurrentTenant(function (err, tenant) {
    if (err) {
      return res.status(400).json(err);
    }

    res.json(tenant);
  });
});
*/

// app.get('/', ExpressStormpath.getUser, function (req, res) {
//   if (req.user) {
//     res.send('Hello, ' + req.user.email);
//   } else {
//     res.send('Not logged in');
//   }
// });

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

app.on('stormpath.ready',function () {
  console.log('Stormpath Ready');
});

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
