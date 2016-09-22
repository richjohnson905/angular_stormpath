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
var models = require('../../models');

exports.index = function(req, res) {
    console.log(req.user.email);
    return getTodos(req, res);
};

exports.create = function(req, res) {
    var data = {text: req.body.text, complete: false};
    models.Todo.create({
        name: data.text,
        complete: false,
        stormId: req.user.email
    })
    .then(function(){
        return getTodos(req, res);
    });
}

function getTodos(req, res) {
    models.Todo.findAll({
        where: {
            stormId: req.user.email
        }
    }).then(function(todos) {
        res.json(todos);
    });
}

exports.destroy = function(req, res) {
    var id = req.params.id;
    models.Todo.destroy({
        where: {
            id: id
        }
    }).then(function(){
        return getTodos(req, res);
    });
};
