'use strict';

var express = require('express');
var controller = require('./friday.controller');

var fridays = express.Router({mergeParams: true});

fridays.get('/', controller.index);
fridays.post('/', controller.create);

module.exports = fridays;