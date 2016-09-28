'use strict';

var express = require('express');
var controller = require('./wednesday.controller');

var wednesdays = express.Router({mergeParams: true});

wednesdays.get('/', controller.index);
wednesdays.post('/', controller.create);

module.exports = wednesdays;