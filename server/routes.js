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
  app.use('/api/provider/:pid/schedule/:sid/sunday', ExpressStormpath.loginRequired, require('./api/provider/schedule/sunday'));
  app.use('/api/provider/:pid/schedule/:sid/monday', ExpressStormpath.loginRequired, require('./api/provider/schedule/monday'));
  app.use('/api/provider/:pid/schedule/:sid/tuesday', ExpressStormpath.loginRequired, require('./api/provider/schedule/tuesday'));
  app.use('/api/provider/:pid/schedule/:sid/wednesday', ExpressStormpath.loginRequired, require('./api/provider/schedule/wednesday'));
  app.use('/api/provider/:pid/schedule/:sid/thursday', ExpressStormpath.loginRequired, require('./api/provider/schedule/thursday'));
  app.use('/api/provider/:pid/schedule/:sid/friday', ExpressStormpath.loginRequired, require('./api/provider/schedule/friday'));
  app.use('/api/provider/:pid/schedule/:sid/saturday', ExpressStormpath.loginRequired, require('./api/provider/schedule/saturday'));

  app.use('/api/consumer', ExpressStormpath.loginRequired, require('./api/consumer'));
  //app.use('/api/consumer', ExpressStormpath.loginRequired, require('./api/consumer'));

  //app.use('/api/todos', ExpressStormpath.loginRequired, require('./api/todo'));
  // app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
