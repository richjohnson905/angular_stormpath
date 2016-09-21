'use strict';

var _ = require('lodash');
var models = require('../../models');

// Get my provider
exports.index = function(req, res) {
  getProviders(req, res, function(providers) {
      return res.json(providers);
  });
};

exports.create = function(req, res) {
  var provider = req.body.text;

   
    models.Provider.create({
        name: data.name,
        address: data.address,
        phone: data.phone,
        stormId: req.user.email
    })
    .then(function(){
        getProviders(req, res);
    });
   
}
// http://stackoverflow.com/questions/36760999/sequelize-and-querying-on-complex-relations?rq=1
exports.show = function(req, res) {
    // var result = {};
    console.log('SHOWING');


    var providerId = req.params.pid;
    models.Provider.findOne({
        where: {
            id: providerId
        }
    }).then(function(provider) {
        console.log(provider.name);
        res.json(provider);
    });

}

function getProviders(req, res, callback) {
    var result = {}
    
    models.Provider.findAll({
        where: {
            stormId: req.user.email
        }
    }).then(function(providers) {
        callback(providers);
    });
    
}

exports.update = function(req, res) {
    
}

exports.destroy = function(req, res) {
    
}

// function getStormId(req, res, callback) {
//     models.Storm.findOne({
//         where: {
//             email: req.user.email
//         }
//     }).then(function(storm) {
//         callback(storm.id);
//     });
// }
// function insertDay(day, dayName, schedule_id) {
//   if (day) {
//     for (i = 0; i < day.length; i++) {
//       req.database.query("INSERT INTO $1 (hour, schedule_id) values($2, $3)", [dayName, day[i], schedule_id], function(err, result) {
//         if (err) {
//             console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }
//       });
//     }
//   }
// }

// function getCompleteProvider(req, res, storm_id) {
//   var myProvider = {};
//   getStormId(req, res, function(storm_id) {
//     getMyProvider(req, res, storm_id, function(provider) {
//       getMySchedules(req, res, provider_id, function(schedule) {
//         myProvider = provider;
//         myProvider.schedule = schedule;
//         getMyDay(req, res, schedule.id, "sunday", function(err, sunday) {
//           myProvider.schedule.sunday = sunday;
//         });
//         getMyDay(req, res, schedule.id, "monday", function(err, monday) {
//           myProvider.schedule.monday = monday;
//         });
//         getMyDay(req, res, schedule.id, "tuesday", function(err, tuesday) {
//           myProvider.schedule.tuesday = tuesday;
//         });
//         getMyDay(req, res, schedule.id, "wednesday", function(err, wednesday) {
//           myProvider.schedule.wednesday = wednesday;
//         });
//         getMyDay(req, res, schedule.id, "thursday", function(err, thursday) {
//           myProvider.schedule.thursday = thursday;
//         });
//         getMyDay(req, res, schedule.id, "friday", function(err, friday) {
//           myProvider.schedule.friday = friday;
//         });
//         getMyDay(req, res, schedule.id, "saturday", function(err, saturday) {
//           myProvider.schedule.saturday = saturday;
//         });
//         return result.json(myProvider);
//       });
//     });
//   });
// }

// function getMyProvider(req, res, storm_id) {
// 	var results = [];
//     // SQL Query > Select Data
//     var query = req.database.query("SELECT * FROM provider WHERE stormpath_id=$1;", [storm_id]);

//     // Stream results back one row at a time
//     query.on('row', function(row) {
//         results.push(row);
//     });

//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//         return res.json(results);
//     });
// }

// function getMySchedules(req, res, provider_id) {
// 	var results = [];
//     // SQL Query > Select Data
//     var query = req.database.query("SELECT * FROM schedule WHERE provider_id=$1;", [provider_id]);

//     // Stream results back one row at a time
//     query.on('row', function(row) {
//         results.push(row);
//     });

//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//         return res.json(results);
//     });
// }

// function getMyDay(req, res, schedule_id, day) {
// 	var results = [];
//     // SQL Query > Select Data
//     var query = req.database.query("SELECT * FROM $1 WHERE schedule_id=$2;", [day, schedule_id]);

//     // Stream results back one row at a time
//     query.on('row', function(row) {
//         results.push(row);
//     });

//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//         return res.json(results);
//     });
// }

// function getStormId2(req, res, callback) {
// 	var storm_id = 0;
// 	var query = req.database.query("SELECT * FROM stormpath WHERE email=$1;", [req.user.email]);
	
//     query.on('row', function(row) {
//         storm_id = row.id;
//     });
	
//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//         callback(storm_id);
//     });
// }

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