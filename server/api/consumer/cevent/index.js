'use strict';

var express = require('express');
var controller = require('./cevent.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:eid', controller.show);
router.post('/', controller.create);
router.delete('/:eid', controller.destroy);

module.exports = router;