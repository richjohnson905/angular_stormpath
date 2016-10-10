'use strict';

var _ = require('lodash');
var models = require('../../../../models');

// Get list of events
exports.index = function(req, res) {
  models.Event.findAll({
    include: [
      {
        model: models.Schedule, where: {id: req.params.sid}
      }, models.Consumer],
      order: '"date" ASC',
      where: {
        date: {
          $gt: new Date()
        }
      }
  }).then(function(obj){
    res.json(obj);
  });
};

exports.show = function(req, res) {
  var eid = req.params.eid;
  models.Event.findOne({
    include: [models.Consumer],
    where: {
      id: eid
    }
  }).then(function(event) {
    res.json(event);
  });
};

