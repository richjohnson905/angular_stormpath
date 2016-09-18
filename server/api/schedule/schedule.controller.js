'use strict';

var _ = require('lodash');
var models = require('../../../models');

// Get list of schedules
exports.index = function(req, res) {
  console.log(req.params);
  getSchedules(req.params.id, function(schedules) {
    return res.json(schedules);
  })
};

function getSchedules(providerId, callback) {
    models.Schedule.findAll({
        where: {
            ProviderId: providerId
        }
    }).then(function(schedules) {
        callback(schedules);
    });
}