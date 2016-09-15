'use strict';

var _ = require('lodash');

// Get list of providers
exports.index = function(req, res) {

  // will use getStormId to get users provider data
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

function getStormId(req, res, callback) {
	var storm_id = 0;
	var query = req.database.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
	
    query.on('row', function(row) {
        storm_id = row.id;
    });
	
    // After all data is returned, close connection and return results
    query.on('end', function() {
        callback(storm_id);
    });
}