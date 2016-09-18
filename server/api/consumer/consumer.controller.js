'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of consumers
exports.index = function(req, res) {
  models.Consumer.findAll({
    include: [models.Provider]
  }).then(function(obj){
    res.json(obj);
  });
    
};