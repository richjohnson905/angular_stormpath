var express = require('express');
var todos = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();

todos.get('/',function(req, res, next) {	  
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
		getStormId(req, res, function(storm_id) {
			return getUsersTodos(req, res, done, storm_id);
		});
    });
});

todos.post('/', function(req, res, next) {
    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
		getStormId(req, res, function(storm_id) {
			client.query("INSERT INTO items(text, complete, stormpath_id) values($1, $2, $3)", [data.text, data.complete, storm_id], function(err, result) {
				if (err) {
					done();
					console.log(err);
					return res.status(500).json({ success: false, data: err});
				}
				return getUsersTodos(req, res, done, storm_id);
			});
		});
    });
});

todos.put('/:todo_id', function(req, res) {
    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }
        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        return getUsersTodos(req, res, done);
    });
});

todos.delete('/:todo_id', function(req, res) {
    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        return getUsersTodos(req, res, done);
    });
});

function getUsersTodos(req, res, done, storm_id) {
	var results = [];
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items WHERE stormpath_id=$1 ORDER BY id ASC;", [storm_id]);

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
}

function getStormId(req, res, callback) {
	var storm_id = 0;
	var query = client.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
	
    query.on('row', function(row) {
		console.log(row);
        storm_id = row.id;
    });
	
    // After all data is returned, close connection and return results
    query.on('end', function() {
        callback(storm_id);
    });
}

module.exports = todos;