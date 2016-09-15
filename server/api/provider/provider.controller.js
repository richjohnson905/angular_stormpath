'use strict';

var _ = require('lodash');

// Get list of providers
exports.index = function(req, res) {
  res.json({"complete": true,
    "name": "Excel",
    "address": "123 main street",
    "phone": "323-323-2342",
    "providers": [
      {
        "complete": true,
        "name": "Kenny Ball",
        "repeats": true,
        "sunday": [],
        "monday": [6,7,8,9,10],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": []
      }
    ]});
};

exports.create = function(req, res) {
  res.json({"complete": true,
    "name": "Excel",
    "address": "123 main street",
    "phone": "323-323-2342",
    "providers": [
      {
        "complete": true,
        "name": "Kenny Ball",
        "repeats": true,
        "sunday": [],
        "monday": [6,7,8,9,10],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": []
      }
    ]});    
}