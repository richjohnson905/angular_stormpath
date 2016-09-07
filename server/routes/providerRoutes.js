var express = require('express');
var providerRoutes = express.Router();

providerRoutes.get('/',function(req, res, next) {
	return "provider";// getUsersTodos(req, res, storm_id);
	// getStormId(req, res, function(storm_id) {
// 		return getUsersTodos(req, res, storm_id);
// 	});
});
module.exports = providerRoutes;