'use strict';

var express = require('express');
var controller = require('./schedule.controller');

var schedules = express.Router({mergeParams: true});

schedules.get('/', controller.index);
schedules.get('/:id', controller.show);

module.exports = schedules;