'use strict';

var express = require('express');
var controller = require('./saturday.controller');

var saturdays = express.Router({mergeParams: true});

saturdays.get('/', controller.index);
saturdays.post('/', controller.create);

module.exports = saturdays;