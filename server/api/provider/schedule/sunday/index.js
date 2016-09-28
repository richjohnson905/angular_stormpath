'use strict';

var express = require('express');
var controller = require('./sunday.controller');

var sundays = express.Router({mergeParams: true});

sundays.get('/', controller.index);
sundays.post('/', controller.create);

module.exports = sundays;