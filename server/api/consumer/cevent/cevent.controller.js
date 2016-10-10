'use strict';

var _ = require('lodash');
var models = require('../../../models');

// Get list of events
exports.index = function(req, res) {
  models.Event.findAll({
    include: [
      {
        model: models.Consumer, where: {stormId: req.user.email},
        include: [models.Provider]
      }],
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
    where: {
      id: eid
    }
  }).then(function(event) {
    res.json(event);
  });
};

exports.create = function(req, res) {
    models.Event.create({date: req.body.dt, message: req.body.message, ConsumerId: req.body.cid, ScheduleId: req.body.sid}).then(function(event){
        return res.json(event);
    });
}

exports.destroy = function(req, res) {
  console.log("DESTROYER " + req.params.eid);
  models.Event.destroy({
      where: {
          id: req.params.eid
      }
  }).then(function(result) {
      res.json(result);
  });
}