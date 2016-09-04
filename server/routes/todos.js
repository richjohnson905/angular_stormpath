var express = require('express');
var todos = express.Router();

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();

todos.get('/',function(req, res) {
	  
	console.log(req.user.email)
	console.log("GETTING TODOS");
    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
		
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items WHERE email=$1 ORDER BY id ASC;", [req.user.email]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

todos.post('/', function(req, res, next) {
	console.log(req.user.email)
	console.log(req.user.id)
	console.log("POSTING TODOS");
    var results = [];

    // Grab data from http request
    console.log(req.body);
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
        client.query("INSERT INTO items(text, complete, email) values($1, $2, $3)", [data.text, data.complete, req.user.email]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items WHERE email=$1 ORDER BY id ASC;", [req.user.email]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});

todos.put('/:todo_id', function(req, res) {
	console.log("PUTTING TODOS");
    var results = [];

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

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items WHERE email=$1 ORDER BY id ASC;", [req.user.email]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

todos.delete('/:todo_id', function(req, res) {
	console.log("DELETING TODOS");
    var results = [];

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

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items WHERE email=$1 ORDER BY id ASC;", [req.user.email]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

module.exports = todos;