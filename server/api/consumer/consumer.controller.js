'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of consumers
exports.index = function(req, res) {
  console.log('Consumer associations:', Object.keys(models.Consumer.associations))
  console.log('Provider associations:', Object.keys(models.Provider.associations))
  console.log('Schedule associations:', Object.keys(models.Schedule.associations))
  getStormId(req, res, function(stormId) {
    models.Consumer.findAll({
      where: {
        StormId: stormId
      },
      include: [models.Provider]
    }).then(function(obj){
      res.json(obj);
    });
  });
    
};

exports.create = function(req, res) {
  console.log("CREATING CONSUMER PROVIDER");
  getStormId(req, res, function(stormId) {
    models.Provider.findById(req.body.pid).then(function(provider) {
      console.log("Found Provider");
      models.Consumer.create({name: req.body.name, StormId: stormId}).then(function(consumer) {
        console.log("Created Consumer Success");
        consumer.addProviders(provider).then(function(result){
          console.log("Made Many-To-Many connection!!");
        });
      });
    });
  });
};


function getStormId(req, res, callback) {
    models.Storm.findOne({
        where: {
            email: req.user.email
        }
    }).then(function(storm) {
      callback(storm.id);
    });
}