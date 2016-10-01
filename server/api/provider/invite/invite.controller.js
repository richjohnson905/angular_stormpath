'use strict';

var _ = require('lodash');
var models = require('../../../models');

exports.index = function(req, res) {
    models.Consumer.findAll({
        include: [{model: models.Provider, where: {stormId: req.user.email}}]
    }).then(function(obj){
        return res.json(obj);
    });
}

exports.create = function(req, res) {
  models.Provider.findOne({where: {id: req.body.pid}}).then(function(provider) {
    models.Consumer.create({name: req.body.name, stormId: req.body.email}).then(function(consumer) {
      consumer.addProviders(provider).then(function(result){
        return res.json(result);
      });
    });
  });
}