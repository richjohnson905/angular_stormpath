/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var ExpressStormpath = require('express-stormpath');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/provider/', ExpressStormpath.loginRequired, require('./api/provider'));
  app.use('/api/provider/:pid/schedule', ExpressStormpath.loginRequired, require('./api/provider/schedule'));
  app.use('/api/provider/:pid/schedule/:sid/nut', ExpressStormpath.loginRequired, require('./api/provider/schedule/nut'));
  app.use('/api/provider/:pid/schedule/:sid/nut/:did', ExpressStormpath.loginRequired, require('./api/provider/schedule/nut'));

  app.use('/api/consumer', ExpressStormpath.loginRequired, require('./api/consumer'));
  app.use('/api/consumer/:cid/wired', ExpressStormpath.loginRequired, require('./api/consumer/wired'));

  app.use('/api/wire', ExpressStormpath.loginRequired, require('./api/consumer/wired'));

  app.use('/api/todo', ExpressStormpath.loginRequired, require('./api/todo'));
  app.use('/api/thing', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
