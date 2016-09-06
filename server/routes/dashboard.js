var express = require('express');
var dashboard = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();

dashboard.get('/',function(req, res, next) {	  
	console.log(req.user.email)
	console.log("GETTING Dashboard");

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
		var results = [];
	
		getStormId(req, res, function(storm_id) {
		    var query = client.query("SELECT * FROM dashboard WHERE stormpath_id=$1 ORDER BY id ASC;", [storm_id]);

		    // Stream results back one row at a time
		    query.on('row', function(row) {
				console.log(row)
		        results.push(row);
		    });

		    // After all data is returned, close connection and return results
		    query.on('end', function() {
		        done();
		        return res.json(results);
		    });
		});
    });
});

function getStormId(req, res, callback) {
	console.log("GETTING storm ID");
	var storm_id = 0;
	var query = client.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
    query.on('row', function(row) {
		console.log(row);
        storm_id = row.id;
    });
	
    // After all data is returned, close connection and return results
    query.on('end', function() {
		console.log("returning: " + storm_id)
        callback(storm_id);
    });
}

module.exports = dashboard;