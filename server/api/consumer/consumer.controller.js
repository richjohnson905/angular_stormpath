'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of consumers
exports.index = function(req, res) {
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


function getStormId(req, res, callback) {
    models.Storm.findOne({
        where: {
            email: req.user.email
        }
    }).then(function(storm) {
        callback(storm.id);
    });
}