var express = require('express');
var todos = express.Router();

todos.get('/',function(req, res, next) {
	getStormId(req, res, function(storm_id) {
		return getUsersTodos(req, res, storm_id);
	});
});

todos.post('/', function(req, res, next) {
    // Grab data from http request
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

});

todos.put('/:todo_id', function(req, res) {
    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // SQL Query > Update Data
	getStormId(req, res, function(storm_id) {
        req.database.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id], function(err, result) {
			if (err) {
				console.log(err);
				return res.status(500).json({ success: false, data: err});
			}
			return getUsersTodos(req, res, storm_id);
		});
	});
});

todos.delete('/:todo_id', function(req, res) {
    // Grab data from the URL parameters
    var id = req.params.todo_id;

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

});

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

module.exports = todos;