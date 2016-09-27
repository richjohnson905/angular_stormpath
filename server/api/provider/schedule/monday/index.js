'use strict';

var express = require('express');
var controller = require('./monday.controller');

var mondays = express.Router({mergeParams: true});

mondays.get('/', controller.index);

module.exports = mondays;