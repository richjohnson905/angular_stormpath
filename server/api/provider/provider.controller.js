'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get my provider
exports.index = function(req, res) {
  getProviders(req, res, function(providers) {
      return res.json(providers);
  });
};

exports.create = function(req, res) {
    models.Provider.create({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        stormId: req.user.email
    })
    .then(function(){
        getProviders(req, res, function(providers){
            res.json(providers);
        });
    });
}
// http://stackoverflow.com/questions/36760999/sequelize-and-querying-on-complex-relations?rq=1
exports.show = function(req, res) {
    console.log('SHOWING: ' + req.params.pid);

    var providerId = req.params.pid;
    models.Provider.findOne({
        where: {
            id: providerId
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(function(provider) {
        console.log('show then: ' + provider.name);
        res.json(provider);
    });
}

exports.update = function(req, res) {
    models.Provider.update(
    {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
    },
    {
        where: { id : req.body.id }
    })
    .then(function (result) { 
        console.log('Result: ' + result);
    }, function(rejectedPromiseError){
        console.log('rejectedPromiseError: ' + rejectedPromiseError);
    });
}

function getProviders(req, res, callback) {
    var result = {}
    
    models.Provider.findAll({
        where: {
            stormId: req.user.email
        },
        attributes: {exclude: ['createdAt', 'updatedAt']}
    }).then(function(providers) {
        callback(providers);
    });
}

exports.destroy = function(req, res) {
    models.Provider.destroy({
        where: {
            id: req.params.pid
        }
    }).then(function(providers) {
        res.json(providers);
    });
}
