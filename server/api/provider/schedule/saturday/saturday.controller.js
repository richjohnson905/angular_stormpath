'use strict';

var _ = require('lodash');
var models = require('../../../../models');
var helper = require('../../../helper/weekday');

// Get list of mondays
exports.index = function(req, res) {
  helper.getHours(req.params.sid, models.Saturday, function(saturdays) {
    return res.json(saturdays);
  });
};

exports.create = function(req, res) {
    return helper.createHelper(req, res, models.Saturday, function(hours) {
        return res.json(hours);
    });
}
