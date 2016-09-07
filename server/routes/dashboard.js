var express = require('express');
var dashboard = express.Router();

dashboard.get('/',function(req, res, next) {	  

	var results = [];

	getStormId(req, res, function(storm_id) {
	    var query = req.database.query("SELECT * FROM dashboard WHERE stormpath_id=$1 ORDER BY id ASC;", [storm_id]);

	    // Stream results back one row at a time
	    query.on('row', function(row) {
	        results.push(row);
	    });

	    // After all data is returned, close connection and return results
	    query.on('end', function() {
	        return res.json(results);
	    });
	});
});

function getStormId(req, res, callback) {
	console.log("GETTING storm ID");
	var storm_id = 0;
	var query = req.database.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
    query.on('row', function(row) {
		console.log(row);
        storm_id = row.id;
    });
	
    // After all data is returned, close connection and return results
    query.on('end', function() {
        callback(storm_id);
    });
}

module.exports = dashboard;