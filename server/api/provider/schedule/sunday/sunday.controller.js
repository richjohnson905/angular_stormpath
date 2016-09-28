'use strict';

var _ = require('lodash');
var models = require('../../../../models');
var helper = require('../../../helper/weekday');

// Get list of sundays
exports.index = function(req, res) {
  helper.getHours(req.params.sid, models.Sunday, function(sundays) {
    return res.json(sundays);
  });
};

exports.create = function(req, res) {
    return helper.createHelper(req, res, models.Sunday, function(hours) {
        return res.json(hours);
    });
}
