'use strict';

var _ = require('lodash');

// Get list of things
exports.index = function(req, res) {
    res.json(req.user.email);
}