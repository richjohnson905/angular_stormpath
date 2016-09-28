'use strict';

var _ = require('lodash');
var models = require('../../../../models');
var helper = require('../../../helper/weekday');

// Get list of tuesdays
exports.index = function(req, res) {
  helper.getHours(req.params.sid, models.Tuesday, function(tuesdays) {
    return res.json(tuesdays);
  });
};

exports.create = function(req, res) {
    return helper.createHelper(req, res, models.Tuesday, function(hours) {
        return res.json(hours);
    });
}
