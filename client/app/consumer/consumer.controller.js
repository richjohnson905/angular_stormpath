'use strict';

angular.module('yoStormApp')
  .controller('ConsumerCtrl', function ($scope) {
    $scope.message = 'Hello';
  })
  /* Consumer Index */
  .controller('ConsumerIndexCtrl', function($scope, $http, $state) {

    $scope.deleteConsumer = function(cid) {
      $http.delete('api/consumer/' + cid).success(function(result){
        $state.go("consumer.index", {}, {reload: true});
      });
    },
    $http.get('/api/consumer').success(function(consumers){
      $scope.consumers = consumers
    });
  })
  /* Consumer Add */
  .controller('ConsumerAddCtrl', function($scope, $http, $state) {
    $scope.processForm = function() {
      $http.post('/api/consumer/', {pid: $scope.providerId, name: $scope.name}).success(function(result){
        $state.go("consumer.index", {}, {reload: true});
      });
    }
  })
  /* Schedule Sessions */
  .controller('ConsumerScheduleCtrl', function($scope, $http, $state, $stateParams) {
    $http.get('/api/consumer/' + $stateParams.cid).success(function(consumer) {
      var pid = consumer.Providers[0].id;
      $scope.consumer = consumer;
      getSchedules($http, pid, function(schedules) {
        $scope.schedules = schedules;
      });
    });
    $scope.processForm = function() {
      alert("process77");
      $state.go("consumer.index");
    },
    $scope.discard = function() {
      $state.go("consumer.index");
    }
  })
  .controller('ConsumerScheduleEditCtrl', function($stateParams, $http, $scope) {
    var pid;
    var sid;
    $http.get('/api/consumer/' + $stateParams.cid).success(function(consumer) {
      pid = consumer.Providers[0].id;
      $scope.pid = pid;
    });
    $scope.pick = function(available) {
      alert(available);
    }
    
    
    // DATEPICKER BEGIN
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.$watch("dt", function(newValue, oldValue) {
    $http.get('/api/provider/' + pid + '/schedule/' + $stateParams.sid).success(function(schedule){
        $scope.schedule = schedule;
        sid = schedule.id;

        if ($scope.dt.getDay() == 0) {
          getDayHours($http, pid, sid, "sunday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "sunday");
          });
        } else if ($scope.dt.getDay() == 1) {
          getDayHours($http, pid, sid, "monday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "monday");
          });          
        } else if ($scope.dt.getDay() == 2) {
          getDayHours($http, pid, sid, "tuesday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "tuesday");
          });          
        } else if ($scope.dt.getDay() == 3) {
          getDayHours($http, pid, sid, "wednesday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "wednesday");
          });
        } else if ($scope.dt.getDay() == 4) {
          getDayHours($http, pid, sid, "thursday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "thursday");
          });
        } else if ($scope.dt.getDay() == 5) {
          getDayHours($http, pid, sid, "friday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "friday");
          });
        } else if ($scope.dt.getDay() == 6) {
          getDayHours($http, pid, sid, "saturday", function(hours){
            $scope.all = getTodayFromDatepick(hours, "saturday");
          });
        }
    });
  });

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.options.minDate = $scope.options.minDate ? null : new Date();
  };

  $scope.toggleMin();

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
  // DATEPICKER END
  });

function getTodayFromDatepick(dayArray, dayName) {
  var all = [];
  for (var i = 0; i < dayArray.length; i++) {
    all.push(dayArray[i].hour);
  }
  return all;  
}

function getDayHours($http, pid, sid, dayName, callback) {
  $http.get('/api/provider/' + pid + '/schedule/' + sid + '/nut/' + dayName).success(function(hours){
    callback(hours);
  });
}

function getSchedules($http, pid, callback) {
  $http.get('/api/provider/' + pid + '/schedule').success(function(schedules){
    callback(schedules);
  });
}