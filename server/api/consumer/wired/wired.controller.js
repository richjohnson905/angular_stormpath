'use strict';

var _ = require('lodash');
var models = require('../../../models');

// Get list of wired groups
exports.index = function(req, res) {

  models.WiredGroup.findAll({
    include: [
      {
        model: models.Consumer, where: {stormId: req.user.email},
        include: [models.Provider]
      },
      {model: models.Nut}],
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
  var cid = req.params.cid;
  var wid = req.params.wid;
  models.WiredGroup.findOne({
    where: {
      id: wid
    }
    //include: [models.Provider]
  }).then(function(wired) {
    res.json(wired);
  });
};

exports.create = function(req, res) {
    models.Consumer.findOne({where: {id: req.body.ConsumerId}}).then(function(consumer){
        models.WiredGroup.create({date: req.body.date, NutId: req.body.NutId}).then(function(wired){
          wired.addConsumers(consumer).then(function(result){
              return res.json(result);
          });
        });
    });
}

exports.destroy = function(req, res) {
  console.log("DESTROYER " + req.params.wid);
  models.WiredGroup.destroy({
      where: {
          id: req.params.wid
      }
  }).then(function(result) {
      res.json(result);
  });
}