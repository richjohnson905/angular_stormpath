'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of consumers
exports.index = function(req, res) {
  console.log('Consumer associations:', Object.keys(models.Consumer.associations))
  console.log('Provider associations:', Object.keys(models.Provider.associations))
  console.log('Schedule associations:', Object.keys(models.Schedule.associations))

  models.Consumer.findAll({
    where: {
      stormId: req.user.email
    },
    include: [models.Provider]
  }).then(function(obj){
    res.json(obj);
  });
    
};

exports.create = function(req, res) {
  
  models.Provider.findById(req.body.pid).then(function(provider) {
    models.Consumer.create({name: req.body.name, stormId: req.user.email}).then(function(consumer) {
      consumer.addProviders(provider).then(function(result){
      });
    });
  });
  
};

exports.destroy = function(req, res) {
  models.Consumer.findById(req.params.id).then(function(consumer) {
    consumer.destroy();
  });
}
