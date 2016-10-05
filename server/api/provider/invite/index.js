'use strict';

var express = require('express');
var controller = require('./invite.controller');

var router = express.Router({mergeParams: true});

router.get('/', controller.index);
router.post('/', controller.create);
// router.get('/:iid', controller.show);
// router.put('/:iid', controller.update);
// router.delete('/:iid', controller.destroy);

module.exports = router;