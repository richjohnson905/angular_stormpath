'use strict';

var express = require('express');
var controller = require('./provider.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:pid', controller.show);
router.put('/:pid', controller.update);
router.delete('/:pid', controller.destroy);

//router.get('/schedule')
module.exports = router;