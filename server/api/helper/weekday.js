'use strict'

module.exports = {


    getHours: function (sid, weekdayModel, callback) {
        doGetHours(sid, weekdayModel, callback);
    },

    createHelper: function(req, res, weekdayModel, callback) {
        var sid = req.body.sid;
            weekdayModel.destroy({
                where: {
                    ScheduleId: sid
                }
            })
            .then(function() {
                var newHours = [];
                for (var i = 0; i < 24; i++) {
                    if (req.body.hours[i]) {
                        weekdayModel.create({
                                hour: i,
                                ScheduleId: req.body.sid
                            })
                            .then(function(){
                            });            
                    }
                }
                doGetHours(sid, weekdayModel, callback);
            });
    }

}

function doGetHours(sid, weekdayModel, callback) {
    weekdayModel.findAll({
        where: {
            ScheduleId: sid
        }
    }).then(function(hours) {
        callback(hours);
    });
}