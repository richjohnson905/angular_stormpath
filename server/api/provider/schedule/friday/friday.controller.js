'use strict';

var _ = require('lodash');
var models = require('../../../../models');
var helper = require('../../../helper/weekday');

// Get list of mondays
exports.index = function(req, res) {
  helper.getHours(req.params.sid, models.Friday, function(fridays) {
    return res.json(fridays);
  });
};

exports.create = function(req, res) {
    return helper.createHelper(req, res, models.Friday, function(hours) {
        return res.json(hours);
    });
}
