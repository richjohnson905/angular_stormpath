'use strict';

var express = require('express');
var controller = require('./nut.controller');

var nuts = express.Router({mergeParams: true});

nuts.get('/', controller.index);
nuts.get('/:did', controller.show);
nuts.post('/', controller.create);

module.exports = nuts;