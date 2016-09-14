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

exports.create = function(req, res) {
    var data = {text: req.body.text, complete: false};

    // SQL Query > Insert Data
	getStormId(req, res, function(storm_id) {
		req.database.query("INSERT INTO items(text, complete, stormpath_id) values($1, $2, $3)", [data.text, data.complete, storm_id], function(err, result) {
			if (err) {
				//done();
				console.log(err);
				return res.status(500).json({ success: false, data: err});
			}
			return getUsersTodos(req, res, storm_id);
		});
	});
};

exports.destroy = function(req, res) {
// Grab data from the URL parameters
    var id = req.params.id;

    // SQL Query > Delete Data
	getStormId(req, res, function(storm_id) {
        req.database.query("DELETE FROM items WHERE id=($1)", [id], function(err, result) {
			if (err) {
				console.log(err);
				return res.status(500).json({ success: false, data: err});
			}
			return getUsersTodos(req, res, storm_id);
		});
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