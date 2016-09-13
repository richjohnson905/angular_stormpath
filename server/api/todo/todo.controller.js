/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /todos              ->  index
 * POST    /todos              ->  create
 * GET     /todos/:id          ->  show
 * PUT     /todos/:id          ->  update
 * DELETE  /todos/:id          ->  destroy
 */
'use strict';

var _ = require('lodash');

// Get list of todos
exports.index = function(req, res) {
  // res.json([{name: "one"},{name: "two"},{name: "three"},{name: "four"}]);
  getStormId(req, res, function(storm_id) {
  		return getUsersTodos(req, res, storm_id);
  	});
};

function getUsersTodos(req, res, storm_id) {
	var results = [];
    // SQL Query > Select Data
    var query = req.database.query("SELECT * FROM items WHERE stormpath_id=$1 ORDER BY id ASC;", [storm_id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        return res.json(results);
    });
}

function getStormId(req, res, callback) {
	var storm_id = 0;
	var query = req.database.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
	
    query.on('row', function(row) {
        storm_id = row.id;
    });
	
    // After all data is returned, close connection and return results
    query.on('end', function() {
        callback(storm_id);
    });
}