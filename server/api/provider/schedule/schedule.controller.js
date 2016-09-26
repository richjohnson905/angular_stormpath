'use strict';

var _ = require('lodash');
var models = require('../../../models');

// Get list of schedules
exports.index = function(req, res) {
    console.log("SCHEDULE INDEX");
  getSchedules(req.params.pid, function(schedules) {
    return res.json(schedules);
  });
};

exports.show = function(req, res) {
    console.log("SCHEDULE SHOW >>>>>>>>>>" + req.params.sid);
    const scheduleId = req.params.sid * 1;
    models.Schedule.findById(scheduleId).then(function(schedule) {
        return res.json(schedule);
    })
}

exports.create = function(req, res) {
    console.log("SCHEDULE Create");
    var pid = req.body.pid;
    models.Schedule.create({
        name: req.body.name,
        ProviderId: pid
    })
    .then(function(){
        getSchedules(pid, function(schedules){
            res.json(schedules);
        });
    });
}

exports.destroy = function(req, res) {
    models.Schedule.destroy({
        where: {
            id: req.params.sid
        }
    }).then(function(schedules) {
        res.json(schedules);
    });
}

function getSchedules(providerId, callback) {
    models.Schedule.findAll({
        where: {
            ProviderId: providerId
        }
    }).then(function(schedules) {
        callback(schedules);
    });
}