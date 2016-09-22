'use strict';

var express = require('express');
var controller = require('./schedule.controller');

var schedules = express.Router({mergeParams: true});

// var providerRouter = require('../index');
// providerRouter.use('/:pid/schedules', schedules);

schedules.get('/', controller.index);
schedules.get('/:sid', controller.show);

module.exports = schedules;