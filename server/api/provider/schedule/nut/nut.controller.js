'use strict';

var _ = require('lodash');
var models = require('../../../../models');
var helper = require('../../../helper/weekday');

// Get list of tuesdays
exports.index = function(req, res) {
  doGetHours(req.params.sid, req.params.day, function(hours) {
    return res.json(hours);
  });
};

exports.show = function(req, res) {
    models.Nut.findAll({
        where: {
            day: req.params.did
        },
        attributes: ['hour']
    }).then(function(hours) {
        return res.json(hours);
    });
}

exports.create = function(req, res) {
    var sid = req.body.sid;
    var day = req.body.day;
    models.Nut.destroy({
        where: {
            ScheduleId: sid,
            day: day
        }
    })
    .then(function() {
        var newHours = [];
        for (var i = 0; i < 24; i++) {
            if (req.body.hours[i]) {
                models.Nut.create({
                    hour: i,
                    day: day,
                    ScheduleId: sid
                })
                .then(function(){
                });            
            }
        }
        doGetHours(sid, day, function(hours){
            return res.json(hours);
        });
    });
}

function doGetHours(sid, day, callback) {
    models.Nut.findAll({
        where: {
            ScheduleId: sid,
            day: day
        },
        attributes: ["hour"]
    }).then(function(hours) {
        callback(hours);
    });
}

// function getDayEnum(theDay) {
//     var day = 0;
//     switch (theDay) {
//     case 0:
//         day = "Sunday";
//         break;
//     case 1:
//         day = "Monday";
//         break;
//     case 2:
//         day = "Tuesday";
//         break;
//     case 3:
//         day = "Wednesday";
//         break;
//     case 4:
//         day = "Thursday";
//         break;
//     case 5:
//         day = "Friday";
//         break;
//     case 6:
//         day = "Saturday";
//     }
//     return day;
// }