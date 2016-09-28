'use strict';

var express = require('express');
var controller = require('./consumer.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:cid', controller.show);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;