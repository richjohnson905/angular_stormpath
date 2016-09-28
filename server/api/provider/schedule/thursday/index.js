'use strict';

var express = require('express');
var controller = require('./thursday.controller');

var thursdays = express.Router({mergeParams: true});

thursdays.get('/', controller.index);
thursdays.post('/', controller.create);

module.exports = thursdays;