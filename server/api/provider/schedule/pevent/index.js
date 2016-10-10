'use strict';

var express = require('express');
var controller = require('./pevent.controller');

var router = express.Router({mergeParams: true});

router.get('/', controller.index);

router.get('/:eid', controller.show);
// router.put('/:iid', controller.update);
// router.delete('/:iid', controller.destroy);

module.exports = router;