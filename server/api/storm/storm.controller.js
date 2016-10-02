'use strict';

var _ = require('lodash');

exports.index = function(req, res) {
    res.json(req.user.email);
}