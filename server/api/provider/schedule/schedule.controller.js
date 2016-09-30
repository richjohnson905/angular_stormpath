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

    // Does not work on heroku
    // models.Schedule.findById(scheduleId).then(function(schedule) {
    //     return res.json(schedule);
    // });

    models.Schedule.findOne({where: {id: scheduleId}}).then(function(schedule){
        return res.json(schedule);
    });

}

exports.create = function(req, res) {
    console.log("SCHEDULE Create");
    var pid = req.body.pid;
    models.Schedule.create({
        name: req.body.name,
        repeat: true,
        ProviderId: pid
    })
    .then(function(){
        getSchedules(pid, function(schedules){
            res.json(schedules);
        });
    });
}

exports.update = function(req, res) {
    models.Schedule.update(
    {
        name: req.body.name
    },
    {
        where: { id : req.body.id }
    })
    .then(function (result) { 
        console.log('Result: ' + result);
        res.json(result);
    }, function(rejectedPromiseError){
        console.log('rejectedPromiseError: ' + rejectedPromiseError);
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