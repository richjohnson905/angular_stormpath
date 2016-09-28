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


// Setup server
var app = express();


var models = require('./models');
models.sequelize.sync().then(function () {
  server.listen(config.port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function onError(err) {
	console.log('app js onError: ' + err);
}

function onListening() {
	console.log("=========listening========");
}

if (process.env.NODE_ENV != 'test') {
	app.use(ExpressStormpath.init(app,{
		// postRegistrationHandler: function (account, req, res, next) {
		// 	models.Storm.create({
		// 		email: account.email
		// 	});
		// 	next();
		// },
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
}

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','favicon.ico')));



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

if (process.env.NODE_ENV != 'test') {

	app.on('stormpath.ready',function () {
		console.log('Stormpath Ready');
	});
}

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
