'use strict';

var express = require('express');
var controller = require('./tuesday.controller');

var tuesdays = express.Router({mergeParams: true});

tuesdays.get('/', controller.index);
tuesdays.post('/', controller.create);

module.exports = tuesdays;