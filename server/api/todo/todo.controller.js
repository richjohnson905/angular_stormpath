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
var models = require('../../../models');

// Get list of todos
exports.index = function(req, res) {
    models.Todo.findAll({
        include: [models.Storm]
    }).then(function(todos) {
        res.json(todos);
    });
};

exports.create = function(req, res) {
    var data = {text: req.body.text, complete: false};

    var storm = getStormId(req, res, function(stormId) {
        models.Todo.create({
            name: data.text,
            complete: false,
            StormId: stormId
        },{
            include: [models.Storm]
        })
        .then(function(){
            models.Todo.findAll({
                include: [models.Storm]
            }).then(function(todos) {
                res.json(todos);
            });
        });
    });

}

function getStormId(req, res, callback) {
    models.Storm.findOne({
        where: {
            email: req.user.email
        }
    }).then(function(storm) {
        callback(storm.id);
    });
}

exports.destroy = function(req, res) {
// Grab data from the URL parameters
    var id = req.params.id;
    models.Todo.destroy({
        where: {
            id: id
        }
    }).then(function(){
        models.Todo.findAll().then(function(todos) {
            res.json(todos);
        });
    });
};

function getStormId2(req, res, callback) {
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