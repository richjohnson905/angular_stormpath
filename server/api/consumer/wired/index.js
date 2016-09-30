'use strict';

var express = require('express');
var controller = require('./wired.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:wid', controller.show);
router.post('/', controller.create);
router.delete('/:wid', controller.destroy);

module.exports = router;