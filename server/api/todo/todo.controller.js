/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /todos              ->  index
 * POST    /todos              ->  create
 * GET     /todos/:id          ->  show
 * PUT     /todos/:id          ->  update
 * DELETE  /todos/:id          ->  destroy
 */
'use strict';

var _ = require('lodash');

// Get list of todos
exports.index = function(req, res) {
  res.json([{name: "one"},{name: "two"},{name: "three"},{name: "four"}]);
};