'use strict';

var express = require('express');
var controller = require('./schedule.controller');

var schedules = express.Router({mergeParams: true});

schedules.get('/', controller.index);
schedules.get('/:sid', controller.show);
schedules.post('/', controller.create);
schedules.delete('/:sid', controller.destroy);

module.exports = schedules;