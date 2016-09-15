'use strict';

var _ = require('lodash');

// Get my provider
exports.index = function(req, res) {
  getStormId(req, res, function(storm_id) {
  	return getCompleteProvider(req, res, storm_id);
  });
};

exports.create = function(req, res) {
  var provider = req.body.text;
  var schedule = provider.schedule;
  var sunday = schedule.sunday;
  var monday = schedule.monday;

    // SQL Query > Insert Data
	getStormId(req, res, function(storm_id) {
    if (provider) {
      req.database.query("INSERT INTO provider(name, address, phone, stormpath_id) values($1, $2, $3, $4)", [provider.name, provider.address, provider.phone, storm_id], function(err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var provider_id = result.id;
        if (schedule) {
          req.database.query("INSERT INTO schedule(name, repeat, provider_id) values($1, $2, $3)", [schedule.name, schedule.repeat, provider_id], function(err, result) {
            if (err) {
              console.log(err);
              return res.status(500).json({ success: false, data: err});
            }
            var schedule_id = result.id;
            insertDay(sunday, "sunday", schedule_id);
            insertDay(monday, "monday", schedule_id);
            insertDay(tuesday, "tuesday", schedule_id);
            insertDay(wednesday, "wednesday", schedule_id);
            insertDay(thursday, "thursday", schedule_id);
            insertDay(friday, "friday", schedule_id);
            insertDay(saturday, "saturday", schedule_id);
          });
          return getCompleteProvider(req, res, storm_id);
        }
      });
    }
	});
}

function insertDay(day, dayName, schedule_id) {
  if (day) {
    for (i = 0; i < day.length; i++) {
      req.database.query("INSERT INTO $1 (hour, schedule_id) values($2, $3)", [dayName, day[i], schedule_id], function(err, result) {
        if (err) {
            console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
      });
    }
  }
}

function getCompleteProvider(req, res, storm_id) {
  var myProvider = {};
  getStormId(req, res, function(storm_id) {
    getMyProvider(req, res, storm_id, function(provider) {
      getMySchedules(req, res, provider_id, function(schedule) {
        myProvider = provider;
        myProvider.schedule = schedule;
        getMyDay(req, res, schedule.id, "sunday", function(err, sunday) {
          myProvider.schedule.sunday = sunday;
        });
        getMyDay(req, res, schedule.id, "monday", function(err, monday) {
          myProvider.schedule.monday = monday;
        });
        getMyDay(req, res, schedule.id, "tuesday", function(err, tuesday) {
          myProvider.schedule.tuesday = tuesday;
        });
        getMyDay(req, res, schedule.id, "wednesday", function(err, wednesday) {
          myProvider.schedule.wednesday = wednesday;
        });
        getMyDay(req, res, schedule.id, "thursday", function(err, thursday) {
          myProvider.schedule.thursday = thursday;
        });
        getMyDay(req, res, schedule.id, "friday", function(err, friday) {
          myProvider.schedule.friday = friday;
        });
        getMyDay(req, res, schedule.id, "saturday", function(err, saturday) {
          myProvider.schedule.saturday = saturday;
        });
        return result.json(myProvider);
      });
    });
  });
}

function getMyProvider(req, res, storm_id) {
	var results = [];
    // SQL Query > Select Data
    var query = req.database.query("SELECT * FROM provider WHERE stormpath_id=$1;", [storm_id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        return res.json(results);
    });
}

function getMySchedules(req, res, provider_id) {
	var results = [];
    // SQL Query > Select Data
    var query = req.database.query("SELECT * FROM schedule WHERE provider_id=$1;", [provider_id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        return res.json(results);
    });
}

function getMyDay(req, res, schedule_id, day) {
	var results = [];
    // SQL Query > Select Data
    var query = req.database.query("SELECT * FROM $1 WHERE schedule_id=$2;", [day, schedule_id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
        return res.json(results);
    });
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

  // // will use getStormId to get users provider data
  // res.json({"complete": true,
  //   "name": "Excel",
  //   "address": "123 main street",
  //   "phone": "323-323-2342",
  //   "schedules": [
  //     {
  //       "complete": true,
  //       "name": "Kenny Ball",
  //       "repeats": true,
  //       "sunday": [],
  //       "monday": [6,7,8,9,10],
  //       "tuesday": [],
  //       "wednesday": [],
  //       "thursday": [],
  //       "friday": [],
  //       "saturday": []
  //     }
  //   ]});