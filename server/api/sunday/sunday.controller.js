'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get list of sundays
exports.index = function(req, res) {
  getSundays(req.params.sid, function(sundays) {
    return res.json(sundays);
  });
};

function getSundays(scheduleId, callback) {
    models.Sunday.findAll({
        where: {
            ScheduleId: scheduleId
        }
    }).then(function(sundays) {
        callback(sundays);
    });
}